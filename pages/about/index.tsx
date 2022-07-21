import { build, loadComponent, loadComponents } from "~~/utils/component";
import NuxtLink from '~~/components/shared/nuxt-link.vue';

const componentNames = ['text'];

export default defineAsyncComponent(
    async () => {
        try {
            // const Text = await loadComponent('text');
            const components = await loadComponents(componentNames);
            return Promise.resolve({
                data: () => {
                    return {
                        count: 1
                    }
                },
                render: () => {
                    const context = this;
                    const tag = build(
                        {
                            tag: 'div',
                            content: 'About....',
                            childrens: [
                                {
                                    tag: components.text,
                                    content: '',
                                    props: {
                                        msg: '99009900'
                                    },
                                    events: {
                                        click: function (event, args) {
                                            console.log(context);
                                            console.log(this);
                                        },
                                        textClick: (event) => {
                                            console.log(event);
                                        }
                                    }
                                },
                                {
                                    tag: NuxtLink,
                                    content: 'To Home',
                                    props: {
                                        to: '/'
                                    }
                                },
                                {
                                    tag: 'ul',
                                    childrens: [
                                        {
                                            tag: 'li',
                                            content: 'About'
                                        }
                                    ]
                                }
                            ]
                        }
                    );
                    return tag;
                }
            })
        }
        catch (err) {
            return Promise.resolve({
                render: () => null
            })
        }
    }
)

// const TextCmp = defineComponent({
//     props: {
//         msg: String,
//         onClick: Function
//     },
//     data() {
//         return {
//             xxx: 111
//         }
//     },
//     render() {
//         return <div onClick={(event) => {
//             this.onClick(event, { a: 1, b: 2 });
//             this.$emit('textClick', { msg: 'Clicked!!!' })
//         }}>Hahahaha{this.msg}</div>
//         // return <div>3432423</div>
//     }
// });

// export default defineComponent({
//     setup() { },
//     data() {
//         return {
//             count: 1
//         }
//     },
//     render() {
//         const context = this;
//         const tag = build(
//             {
//                 tag: 'div',
//                 content: 'Hihihihi',
//                 childrens: [
//                     {
//                         tag: TextCmp,
//                         content: '',
//                         props: {
//                             msg: '99009900'
//                         },
//                         events: {
//                             click: function (event, args) {
//                                 console.log(context);
//                                 console.log(this);
//                             },
//                             textClick: (event) => {
//                                 console.log(event);
//                             }
//                         }
//                     },
//                     {
//                         tag: 'ul',
//                         childrens: [
//                             {
//                                 tag: 'li',
//                                 content: 'hahihihiha'
//                             }
//                         ]
//                     }
//                 ]
//             }
//         );
//         console.log(121212121212)
//         console.log(tag);
//         console.log(9090990)
//         return tag;
//     },
//     mounted() {
//         console.log(this);
//     }
// })