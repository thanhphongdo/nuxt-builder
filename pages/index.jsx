import { build, loadComponents } from "~~/utils/component";

const componentNames = ['text', 'foo', 'bar'];

const pageConfig = {
    props: {},
    data: function () {
        return {
            count: 1
        }
    },
    render: function () {
        const context = this;
        const tag = build(
            {
                tag: 'div',
                childrens: [
                    {
                        tag: 'text',
                        content: '',
                        props: {
                            msg: 'I am Home page'
                        },
                        events: {
                            click: function (event, args) {
                                console.log('*********')
                                console.log(context);

                            },
                            textClick: (event) => {
                                console.log('*********')
                                console.log(event);
                            }
                        }
                    },
                    {
                        tag: 'foo',
                        content: 'Hihi'
                    },
                    {
                        tag: 'bar',
                        content: 'Haha'
                    },
                    {
                        tag: 'NuxtLink',
                        content: 'To About',
                        props: {
                            to: '/about'
                        }
                    },
                    {
                        tag: 'ul',
                        childrens: [
                            {
                                tag: 'li',
                                content: '3232323232_' + this.count
                            }
                        ]
                    }
                ]
            }
        );
        return tag;
    }
}

export default defineAsyncComponent(
    async () => {
        await loadComponents(componentNames);
        return Promise.resolve(pageConfig);
    }
);

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
//         return tag
//     },
//     mounted() {
//         console.log(this);
//     }
// })