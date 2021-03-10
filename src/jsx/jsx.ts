type Props = { [key: string]: any } | (() => any);

export const JSX = (
    tagName: string | Function,
    props: Props,
    ...children: Array<string | Node | Array<string | Node>>
) => {
    if (typeof tagName === 'function') {
        return tagName(props, children);
    }

    const node = document.createElement(tagName);

    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (key.startsWith('on')) {
                node.addEventListener(key.substr(2), value);
            } else {
                node.setAttribute(key, value);
            }
        });
    }

    children.forEach((child) => {
        if (Array.isArray(child)) {
            child.forEach((el) => {
                node.appendChild(typeof el === 'string' ? document.createTextNode(el.toString()) : el);
            });
        } else {
            node.appendChild(typeof child === 'string' ? document.createTextNode(child.toString()) : child);
        }
    });

    return node;
};
