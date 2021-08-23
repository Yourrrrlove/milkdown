import { css } from '@emotion/css';
import { Ctx, themeToolCtx } from '@milkdown/core';
import { Command } from 'prosemirror-commands';
import { Node, Schema } from 'prosemirror-model';

export const createDropdown = (ctx: Ctx) => {
    const div = document.createElement('div');
    div.setAttribute('role', 'listbox');
    div.setAttribute('tabindex', '-1');
    const themeTool = ctx.get(themeToolCtx);
    const style = css`
        width: 20.5rem;
        max-height: 20.5rem;
        overflow-y: auto;
        ${themeTool.widget.border?.()};
        border-radius: ${themeTool.size.radius};
        position: absolute;
        background: ${themeTool.palette('surface')};

        ${themeTool.widget.shadow?.()};

        &.hide {
            display: none;
        }

        ${themeTool.widget.scrollbar?.()};

        .slash-dropdown-item {
            display: flex;
            gap: 2rem;
            height: 3rem;
            padding: 0 1rem;
            align-items: center;
            justify-content: flex-start;
            cursor: pointer;
            line-height: 2;
            font-family: ${themeTool.font.font};
            font-size: 0.875rem;

            transition: all 0.4s ease-in-out;

            &,
            .icon {
                color: ${themeTool.palette('neutral', 0.87)};
                transition: all 0.4s ease-in-out;
            }

            &.hide {
                display: none;
            }

            &.active {
                background: ${themeTool.palette('secondary', 0.12)};
                &,
                .icon {
                    color: ${themeTool.palette('primary')};
                }
            }
        }
    `;
    div.classList.add('slash-dropdown', style, 'hide');

    return div;
};

type ItemOptions = {
    iconClassName: string;
    textClassName: string;
};
export const createDropdownItem = (text: string, icon: string, options?: Partial<ItemOptions>) => {
    const iconClassName = options?.iconClassName ?? 'icon material-icons material-icons-outlined';
    const textClassName = options?.textClassName ?? 'text';

    const div = document.createElement('div');
    div.setAttribute('role', 'option');
    div.classList.add('slash-dropdown-item');

    const iconSpan = document.createElement('span');
    iconSpan.textContent = icon;
    iconSpan.className = iconClassName;

    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.className = textClassName;

    div.appendChild(iconSpan);
    div.appendChild(textSpan);

    return div;
};

export const getDepth = (node: Node) => {
    let cur = node;
    let depth = 0;
    while (cur.childCount) {
        cur = cur.child(0);
        depth += 1;
    }

    return depth;
};

const cleanUp: Command = (state, dispatch) => {
    const { selection } = state;
    const { $from } = selection;
    const tr = state.tr.deleteRange($from.start(), $from.pos);
    dispatch?.(tr);
    return false;
};

export const cleanUpAndCreateNode =
    (createCommand: () => void): Command =>
    (state, dispatch, view) => {
        if (view) {
            cleanUp(state, dispatch, view);
            createCommand();
        }
        return true;
    };

export const nodeExists = (name: string) => (schema: Schema) => Boolean(schema.nodes[name]);