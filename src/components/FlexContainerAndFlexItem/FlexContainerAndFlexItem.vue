<template>
  <div>
    <div class="mb-3 mb-xl-5">
      <h2>1.1 容器(flex container)和项目(flex item)</h2>
      <p>容器包裹项目，这里的wrapper就是容器，A和B就是项目。</p>
      <ul >
        <li>容器：通过为标签添加<mark>display: flex</mark>样式，来声明这是一个容器</li>
        <li>项目：不需要设置。在父标签设置了<mark>display: flex</mark>样式后，子元素自动变成项目。</li>
      </ul>
      <small>html只是演示说明，不是真实的结构。</small>
    </div>


    <div class="container">
      <div class="row">
        <div class="col-12 col-xl-5">
          <div class="form-group mb-4">
            <label for="htmlCode"><h3>Html Code</h3></label>
            <textarea ref="htmlCode" v-model="htmlCode" class="form-control" id="htmlCode"
                      :style="{ 'height': htmlCodeHeight+'px'}" readonly></textarea>
          </div>

          <div class="form-group mb-4">
            <label for="cssCode"><h3>CSS Code</h3></label>
            <textarea v-model="cssCode" style="height: 100px" class="form-control" id="cssCode" readonly></textarea>
          </div>

        </div>
        <div class="col-12 col-xl-7">
          <h3>Html View</h3>
          <div class="d-flex">
            <div id="box-wrapper" class="box d-flex flex-column align-items-center"
                 :class="[{ 'box-empty': Object.keys(boxes.child)==0 }]"
                 @mouseover.stop="boxMouseOver(boxes,null)"
                 @mouseleave.stop="boxMouseLeave(boxes)"
                 @click.stop="boxChildAdd(boxes)">
              <p>{{boxes.prop.active? "+":"wrapper"}}</p>
              <div class="boxes d-flex">
                <div v-for="(items,index) in boxes.child" :key="index" :id="items.prop.text"
                     class="box d-flex flex-column align-items-center"
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
</template>

<script>
  export default {
    name: "Relativity",
    data() {
      return {
        cssCode:"#wrapper{" +"\n"+
                "    display: flex;" +"\n"+
                "}",

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
              },
              child: []
            },
            {
              prop: {
                text: "B",
                active: false,
              },
              child: []
            },
            /*
                        {
                          prop: {
                            text: "A",
                            active: false,
                          },
                          child: [
                            {
                              prop: {
                                text: "a1",
                                active: false,
                              },
                              child: []
                            },
                            {
                              prop: {
                                text: "a2",
                                active: false,
                              },
                              child: []
                            }

                          ]
                        },
                        {
                          prop: {
                            text: "B",
                            active: false,
                          },
                          child: [
                            {
                              prop: {
                                text: "b1",
                                active: false,
                              },
                              child: []
                            }
                          ]
                        }
            */
          ]
        },
        htmlCode: "",
        htmlCodeHeight: 0,
      }
    },
    created() {
      this.updateHtmlCode();
    },
    mounted() {
      this.htmlCodeHeight = this.$refs.htmlCode.scrollHeight;
    },
    methods: {
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
        if (this.$refs.htmlCode) this.htmlCodeHeight = this.$refs.htmlCode.scrollHeight + 30;
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
      }
    }

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
    min-width: 100px;
    min-height: 100px;
  }


  .box:hover {
    cursor: pointer;
    border: 1px dotted #2c3e50;
  }

</style>