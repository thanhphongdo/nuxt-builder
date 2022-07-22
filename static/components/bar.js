function createCmp(defineCmp, build) {
    return defineCmp({
        props: {
            msg: String,
            onClick: Function
        },
        render: function () {
            return build({
                tag: 'div',
                content: 'I am Bar',
                events: {
                    click: (function () {
                        this.$emit('textClick', { msg: 'Clicked!!!' })
                    }).bind(this)
                }
            });
        }
    })
}