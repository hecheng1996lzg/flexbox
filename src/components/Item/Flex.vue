<template>
    <div>
        <div class="mb-3 mb-xl-5">
            <h2>3.3 项目缩放比例简写</h2>
            <p>
                <mark>flex</mark>
                属性是flex-grow, flex-shrink 和 flex-basis的简写。常用写法包括：
            </p>
            <ul>
                <li>
                    <mark>flex: 1</mark>
                    效果和
                    <mark>flex-grow: 1</mark>
                    一样，在有空间剩余的情况下，会自动放大。
                </li>
                <li>
                    <mark>flex: none</mark>
                    效果和
                    <mark>flex-shrink: 0</mark>
                    一样，在空间不足的情况下，不会自动缩小。
                </li>
            </ul>
        </div>


        <div class="container">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Flex",
        data() {
            return {
                cssCode: "#wrapper{" + "\n" +
                    "    display: flex;" + "\n" +
                    "    width: 400px;" + "\n" +
                    "}" + "\n" + "\n" +
                    "#A, #B, #C{" + "\n" +
                    "    width: 200px;" + "\n" +
                    "}",
                cssCodeBak: "",

                direction: "row",

                axis: {
                    row: 0,
                    rowReverse: 180,
                    column: 90,
                    columnReverse: 270
                },

                axisRotate: 0,

                //第一层，生成ABC
                prefix1: [...Array(3).keys()].map(i => String.fromCharCode(i + 65)),
                //第二层，生成123
                prefix2: [...Array(3).keys()].map(i => i + 1),
                //第二层，生成1.1, 2.2, 3.1
                prefix3: [...Array(3).keys()].map(i => "." + (i + 1)),

                boxes: {
                    prop: {
                        text: "wrapper",
                        active: false,
                    },
                    child: [
                        {
                            prop: {
                                text: "A",
                                active: false,
                                flexGrow: 0,
                            },
                            child: []
                        },
                        {
                            prop: {
                                text: "B",
                                active: false,
                                flexGrow: 0,
                            },
                            child: []
                        },
                        {
                            prop: {
                                text: "C",
                                active: false,
                                flexGrow: 0,
                            },
                            child: []
                        },
                    ]
                },
                htmlCode: "",
                htmlCodeHeight: 0,
                cssCodeHeight: 450,
            }
        },
        created() {
            //this.cssCodeBak = this.cssCode;
            //this.updateHtmlCode();
            //this.updateCssCode();
        },
        mounted() {
            //this.htmlCodeHeight = this.$refs.htmlCode.scrollHeight;
        },
        methods: {
            //横线转驼峰
            toCamel(str) {
                return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
                    return $1 + $2.toUpperCase();
                });
            },
            updateHtmlCode() {
                let _self = this;

                this.htmlCode = "<div id=\"wrapper\">";
                let depth = 0;

                fun(this.boxes);

                function fun(boxes) {
                    depth++;
                    for (let index in boxes.child) {
                        let value = boxes.child[index];
                        _self.htmlCode += "\n";
                        for (let i = 0; i < depth; i++) {
                            _self.htmlCode += "    ";
                        }
                        _self.htmlCode += "<div id=\"" + value.prop.text + "\">";

                        if (value.child.length > 0) {
                            fun(value);
                            _self.htmlCode += "\n";
                            for (let i = 0; i < depth; i++) {
                                _self.htmlCode += "    ";
                            }
                        }
                        _self.htmlCode += "</div>";
                    }
                    depth--;
                }

                this.htmlCode += "\n";
                this.htmlCode += '</div>';
                if (this.$refs.htmlCode) this.htmlCodeHeight = this.$refs.htmlCode.scrollHeight;
            },
            //移入
            boxMouseOver(boxes, parentBox) {
                if (parentBox) {
                    this.$set(parentBox.prop, "active", false);
                }
                this.$set(boxes.prop, "active", true);
            },
            //移出
            boxMouseLeave(boxes) {
                this.$set(boxes.prop, "active", false);
            },
            /**
             * 点击增加内部子元素
             * @param boxes         当前点击元素
             * @param prefixArgs    前几层前缀下标数组
             */
            boxChildAdd(boxes, ...prefixArgs) {
                let text = "";

                //拼接之前层级的转换
                for (let k in prefixArgs) {
                    //根据循环次数，计算当前所在前缀层数
                    let argPrefixLength = parseInt(k) + 1;
                    //根据计算下当前前缀层数的下标
                    let childCount = prefixArgs[k];
                    //防止超出边界
                    if (!this[`prefix${argPrefixLength}`][childCount]) {
                        return false;
                    }
                    text += this[`prefix${argPrefixLength}`][childCount];
                }

                //根据参数数量，计算当前所在前缀层数
                let argPrefixLength = prefixArgs.length + 1;

                //更具计算当前所在前缀层数，子元素数量。加一个新的子元素
                let childCount = boxes.child.length;

                //计算对应前缀层数，新增加的文本
                if (!this[`prefix${argPrefixLength}`][childCount]) {
                    return false;
                }
                text += this[`prefix${argPrefixLength}`][childCount];

                this.$set(boxes.child, childCount, {
                    prop: {
                        text,
                        active: false,
                    },
                    child: []
                });
                this.updateHtmlCode();
            },
            updateCssCode() {
                let cssCode = "\n\n";
                for (let key in this.boxes.child) {
                    let value = this.boxes.child[key];
                    cssCode += "#" + value.prop.text + "{" + "\n" +
                        "    flex-grow: " + value.prop.flexGrow + ";" + "\n" +
                        "}\n";
                }
                this.cssCode = this.cssCodeBak + cssCode;
            }
        },

        watch: {
            direction: function (newD, oldD) {
                this.updateHtmlCode();
                this.axisRotate = this.axis[this.toCamel(newD)];
            }
        },

    }
</script>

<style scoped>

    .box {
        display: flex;
        flex-grow: 0;
        box-sizing: border-box;
        margin: 6px;
        border: 1px solid #fff;
        background: rgba(0, 123, 255, 0.3);
    }

    .box > p {
        padding: 0.4em;
        margin: 0.2em 0 0.2em;
    }

    .box-empty {
        min-width: 38px;
        min-height: 38px;
    }

    #box-wrapper {
        width: 430px;
        min-height: 400px;
    }

    .box:hover {
        cursor: pointer;
        border: 1px dotted #2c3e50;
    }
</style>