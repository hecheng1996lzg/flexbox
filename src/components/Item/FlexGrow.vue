<template>
    <div>
        <div class="mb-3 mb-xl-5">
            <h2>3.1 项目的放大比例</h2>
            <p>容器内项目的
                <mark>flex-grow</mark>
                样式能够控制当容器内空间剩余时，项目是否自动放大，默认值为0（不放大）。设置值为1则会自动放大。大于1则按比例放大。
            </p>
            <small>html只是演示说明，不是真实的结构。</small>
        </div>


        <div class="container">
            <div class="row">
                <div class="col-12 col-xl-5">
                    <div class="mb-3">
                        <h3>flex-shrink</h3>
                        <div v-for="(box,index) in boxes.child" :key="index" class="form-group">
                            <label>#{{box.prop.text}}{ flex-grow: {{box.prop.flexGrow}}; }</label>
                            <input type="range" class="custom-range" min="0" max="5"
                                   v-model="box.prop.flexGrow"
                                   @change="updateCssCode">
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label for="exampleFormControlTextarea1"><h3>Html Code</h3></label>
                        <textarea ref="htmlCode" v-model="htmlCode" class="form-control"
                                  id="exampleFormControlTextarea1"
                                  :style="{ 'height': htmlCodeHeight+'px'}" readonly></textarea>
                    </div>
                    <div class="form-group mb-4">
                        <label for="cssCode"><h3>CSS Code</h3></label>
                        <textarea v-model="cssCode" :style="{ 'height': cssCodeHeight+'px'}" class="form-control"
                                  id="cssCode"
                                  readonly></textarea>
                    </div>

                </div>
                <div class="col-12 col-xl-7">
                    <div>
                        <h3>説明</h3>
                        <small>蓝色箭头是当前主轴方向，橙色直线是当前交叉轴。</small>
                        <div class="d-flex flex-direction-wrapper">
                            <div id="box-wrapper" class="box d-flex flex-column align-items-center"
                                 :class="[{ 'box-empty': Object.keys(boxes.child)==0 }]"
                                 @mouseover.stop="boxMouseOver(boxes,null)"
                                 @mouseleave.stop="boxMouseLeave(boxes)"
                                 @click.stop="boxChildAdd(boxes)">
                                <p class="bg-info text-white w-100 m-0 text-center">{{boxes.prop.active?
                                    "+":"wrapper"}}</p>
                                <div class="boxes d-flex w-100 h-100"
                                     :style="{ flexDirection: direction }">
                                    <div v-for="(items,index) in boxes.child" :key="index" :id="items.prop.text"
                                         :style="{ flexGrow: items.prop.flexGrow}"
                                         class="box d-flex flex-column align-items-center justify-content-center"
                                         :class="[{ 'box-empty': !items.child||Object.keys(items.child)==0 }]"
                                         @mouseover.stop="boxMouseOver(items,boxes)"
                                         @mouseleave.stop="boxMouseLeave(items)"
                                         @click.stop="boxChildAdd(items,index)">
                                        <p>{{items.prop.active? "+":items.prop.text}}</p>
                                        <div class="boxes d-flex">
                                            <div v-for="(item,i) in items.child" :key="i" :id="item.prop.text"
                                                 class="box d-flex flex-column align-items-center"
                                                 :class="[{ 'box-empty': !item.child||Object.keys(item.child)==0 }]"
                                                 @mouseover.stop="boxMouseOver(item,items)"
                                                 @mouseleave.stop="boxMouseLeave(item)"
                                                 @click.stop="boxChildAdd(item,index,i)">
                                                <p>{{item.prop.active? "+":item.prop.text}}</p>
                                                <div class="boxes d-flex">
                                                    <div v-for="(item1,j) in item.child" :key="j" :id="item1.prop.text"
                                                         class="box d-flex flex-column align-items-center"
                                                         :class="[{ 'box-empty': !item1.child||Object.keys(item1.child)==0 }]"
                                                         @mouseover.stop="boxMouseOver(item1,item)"
                                                         @mouseleave.stop="boxMouseLeave(item1)"
                                                         @click.stop="()=>{return false}">
                                                        <p>{{item1.prop.text}}</p>
                                                        <div class="boxes"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--
                                      <div id="box-A" class="box">
                                        <div id="box-A-a1" class="box"></div>
                                        <div id="box-A-a2" class="box"></div>
                                        <div id="box-A-a3" class="box"></div>
                                      </div>
                                      <div id="box-B" class="box"></div>
                                      <div id="box-C" class="box"></div>
                                -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FlexGrow",
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
            this.cssCodeBak = this.cssCode;
            this.updateHtmlCode();
            this.updateCssCode();
        },
        mounted() {
            this.htmlCodeHeight = this.$refs.htmlCode.scrollHeight;
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