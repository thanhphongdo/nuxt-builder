import { BaseAxios } from './axios';

try {
    Object.defineProperty(String.prototype, 'capitalize', {
        value: function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        enumerable: false
    });
}
catch (err) { }

export function build(element) {
    const events = {};
    Object.keys(element.events || {}).forEach((key: any) => {
        events['on' + key.capitalize()] = element.events[key];
    });
    if (!element.childrens || !element.childrens.length) {
        return <element.tag {...(element.props || {})} {...(events)}>{element.content}</element.tag>;
    } else {
        return <element.tag {...(element.props || {})} {...(events)}>{element.childrens.map(item => build(item))}</element.tag>;
    }
}

export async function loadComponent(name: string) {
    const axios = new BaseAxios();
    const res = await axios.get(`/static/components/${name}.js`, {
        dataType: 'script'
    });
    let createCmp;
    eval(`createCmp = ${res.data}`);
    return createCmp(defineComponent, build);
}

export async function loadComponents(componentNames: Array<string>) {
    const components: {
        [key: string]: any;
    } = {};
    (await Promise.all(componentNames.map(cmpName => loadComponent(cmpName)))).forEach((cmp, index) => {
        console.log(cmp);
        components[componentNames[index]] = cmp;
    });
    return components;
}