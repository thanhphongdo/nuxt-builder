'use strict';
function createCmp(defineCmp, build) {
    return defineCmp({
        props: {
            msg: String,
            onClick: Function
        },
        render: function () {
            return build({
                tag: 'div',
                content: 'I am Foo',
                events: {
                    click: () => {
                        this.$emit('textClick', { msg: 'Clicked!!!' })
                    }
                }
            });
        }
    })
}