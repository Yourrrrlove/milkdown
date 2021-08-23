import { css } from '@emotion/css';
import { createCmd, createCmdKey } from '@milkdown/core';
import { createNode, findSelectedNodeOfType } from '@milkdown/utils';
import { InputRule } from 'prosemirror-inputrules';
import { NodeSelection } from 'prosemirror-state';

export const ModifyImage = createCmdKey<string>();
export const InsertImage = createCmdKey<string>();
const id = 'image';
export const image = createNode((options, utils) => {
    const containerStyle = options?.headless
        ? ''
        : css`
              display: inline-block;
              margin: 0 auto;
              position: relative;
              text-align: center;
              font-size: 0;
              width: 100%;
              img {
                  width: 100%;
                  height: auto;
                  object-fit: contain;
              }
              .icon,
              .placeholder {
                  display: none;
              }

              &.system {
                  img {
                      width: 0;
                      height: 0;
                      visibility: hidden;
                  }

                  .icon,
                  .placeholder {
                      display: inline;
                  }

                  box-sizing: border-box;
                  height: 3rem;
                  background-color: ${utils.themeTool.palette('background')};
                  border-radius: ${utils.themeTool.size.radius};
                  display: inline-flex;
                  gap: 2rem;
                  justify-content: flex-start;
                  align-items: center;
                  .icon {
                      width: 1.5rem;
                      height: 1.5rem;
                      margin: 0;
                      margin-left: 1rem;
                      position: relative;
                      &::before {
                          position: absolute;
                          top: 0;
                          bottom: 0;
                          left: 0;
                          right: 0;
                      }
                  }
                  .placeholder {
                      margin: 0;
                      &::before {
                          content: '';
                          font-size: 0.875rem;
                          color: ${utils.themeTool.palette('neutral', 0.6)};
                      }
                  }
              }

              &.loading {
                  .icon {
                      &::before {
                          ${utils.themeTool.widget.icon?.('hourglass_empty')}
                      }
                  }

                  .placeholder {
                      &::before {
                          content: 'Loading...';
                      }
                  }
              }

              &.empty {
                  .icon {
                      &::before {
                          ${utils.themeTool.widget.icon?.('image')}
                      }
                  }
                  .placeholder {
                      &::before {
                          content: 'Add an image';
                      }
                  }
              }

              &.failed {
                  .icon {
                      &::before {
                          ${utils.themeTool.widget.icon?.('broken_image')}
                      }
                  }

                  .placeholder {
                      &::before {
                          content: 'Image load failed';
                      }
                  }
              }
          `;

    const style = options?.headless
        ? ''
        : css`
              display: inline-block;
              margin: 0 auto;
              object-fit: contain;
              width: 100%;
              position: relative;
              height: auto;
              text-align: center;
          `;

    return {
        id,
        schema: {
            inline: true,
            group: 'inline',
            draggable: true,
            selectable: true,
            marks: '',
            attrs: {
                src: { default: '' },
                alt: { default: null },
                title: { default: null },
                failed: { default: false },
                loading: { default: true },
            },
            parseDOM: [
                {
                    tag: 'img[src]',
                    getAttrs: (dom) => {
                        if (!(dom instanceof HTMLElement)) {
                            throw new Error();
                        }
                        return {
                            failed: dom.classList.contains('failed'),
                            loading: dom.classList.contains('loading'),
                            src: dom.getAttribute('src') || '',
                            alt: dom.getAttribute('alt'),
                            title: dom.getAttribute('title'),
                        };
                    },
                },
            ],
            toDOM: (node) => {
                return [
                    'img',
                    {
                        ...node.attrs,
                        class: utils.getClassName(
                            node.attrs,
                            id,
                            node.attrs.failed ? 'failed' : '',
                            node.attrs.loading ? 'loading' : '',
                            style,
                        ),
                    },
                ];
            },
        },
        parser: {
            match: ({ type }) => type === id,
            runner: (state, node, type) => {
                const url = node.url as string;
                const alt = node.alt as string;
                const title = node.title as string;
                state.addNode(type, {
                    src: url,
                    alt,
                    title,
                });
            },
        },
        serializer: {
            match: (node) => node.type.name === id,
            runner: (state, node) => {
                state.addNode('image', undefined, undefined, {
                    title: node.attrs.title,
                    url: node.attrs.src,
                    alt: node.attrs.alt,
                });
            },
        },
        commands: (nodeType, schema) => [
            createCmd(InsertImage, (src = '') => (state, dispatch) => {
                if (!dispatch) return true;
                const { tr } = state;
                const node = nodeType.create({ src });
                if (!node) {
                    return true;
                }
                const _tr = tr.replaceSelectionWith(node);
                const { $from } = _tr.selection;
                const start = $from.start();
                const __tr = _tr.replaceSelectionWith(schema.node('paragraph'));
                const sel = NodeSelection.create(__tr.doc, start);
                dispatch(__tr.setSelection(sel));
                return true;
            }),
            createCmd(ModifyImage, (src = '') => (state, dispatch) => {
                const node = findSelectedNodeOfType(state.selection, nodeType);
                if (!node) return false;

                const { tr } = state;
                dispatch?.(
                    tr.setNodeMarkup(node.pos, undefined, { ...node.node.attrs, loading: true, src }).scrollIntoView(),
                );

                return true;
            }),
        ],
        inputRules: (nodeType) => [
            new InputRule(
                /!\[(?<alt>.*?)]\((?<filename>.*?)(?=“|\))"?(?<title>[^"]+)?"?\)/,
                (state, match, start, end) => {
                    const [okay, alt, src = '', title] = match;
                    const { tr } = state;
                    if (okay) {
                        tr.replaceWith(start, end, nodeType.create({ src, alt, title }));
                    }

                    return tr;
                },
            ),
        ],
        view: (_editor, nodeType, node, view, getPos) => {
            const container = document.createElement('div');
            container.className = utils.getClassName(node.attrs, id, containerStyle);

            const content = document.createElement('img');
            container.append(content);
            const icon = document.createElement('span');
            icon.classList.add('icon');
            const placeholder = document.createElement('span');
            placeholder.classList.add('placeholder');
            container.append(icon, placeholder);

            const loadImage = (src: string) => {
                container.classList.add('system', 'loading');
                const img = document.createElement('img');
                img.src = src;

                img.onerror = () => {
                    const { tr } = view.state;
                    const _tr = tr.setNodeMarkup(getPos(), nodeType, {
                        ...node.attrs,
                        src,
                        loading: false,
                        failed: true,
                    });
                    view.dispatch(_tr);
                };

                img.onload = () => {
                    const { tr } = view.state;
                    const _tr = tr.setNodeMarkup(getPos(), nodeType, {
                        ...node.attrs,
                        src,
                        loading: false,
                        failed: false,
                    });
                    view.dispatch(_tr);
                };
            };

            const { src, loading, title, alt } = node.attrs;
            content.src = src;
            content.title = title;
            content.alt = alt;

            if (loading) {
                loadImage(src);
            }
            if (src.length === 0) {
                container.classList.add('system', 'empty');
            }

            return {
                dom: container,
                contentDOM: content,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== id) return false;

                    const { src, alt, title, loading, failed } = updatedNode.attrs;
                    content.src = src;
                    content.alt = alt;
                    content.title = title;
                    if (loading) {
                        loadImage(src);
                        return true;
                    }
                    if (failed) {
                        container.classList.remove('loading', 'empty');
                        container.classList.add('system', 'failed');
                        return true;
                    }
                    if (src.length > 0) {
                        container.classList.remove('system', 'empty', 'loading');
                        return true;
                    }

                    container.classList.add('system', 'empty');
                    return true;
                },
            };
        },
    };
});