import { BaseAxios } from './axios';
import NuxtLink from '~~/components/shared/nuxt-link.vue';

export const components: { [key: string]: any } = {
    NuxtLink
};

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
    let tag = element.tag;
    if (components[tag]) {
        tag = components[tag];
    }
    if (!element.childrens || !element.childrens.length) {
        return <tag {...(element.props || {})} {...(events)}>{element.content}</tag>;
    } else {
        return <tag {...(element.props || {})} {...(events)}>{element.childrens.map(item => build(item))}</tag>;
    }
}

export async function loadComponent(name: string) {
    try {
        if (components[name]) {
            return components[name];
        }
        const axios = new BaseAxios();
        const res = await axios.get(`http://localhost:3000/static/components/${name}.js`);
        let createCmp;
        eval(`createCmp = ${res.data}`);
        components[name] = createCmp(defineComponent, build);
        return components[name];
    } catch (err) {
        return null;
    }
}

export async function loadComponents(componentNames: Array<string>) {
    const components: {
        [key: string]: any;
    } = {};
    (await Promise.all(componentNames.map(cmpName => loadComponent(cmpName)))).forEach((cmp, index) => {
        components[componentNames[index]] = cmp;
    });
    return components;
}