<template>
  <div class="accordion BennkyouList-accordion" id="accordionExample">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0">
          <button class="btn btn-link text-left" type="button" data-toggle="collapse" data-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
            1. 容器(flex container)和项目(flex item)
          </button>
        </h2>
      </div>

      <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
          <p><router-link to="/flexContainerAndFlexItem">1.1 容器(flex container)和项目(flex item)</router-link></p>
          <p><router-link to="/relativity">1.2 相对性</router-link></p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingTwo">
        <h2 class="mb-0">
          <button class="btn btn-link text-left collapsed" type="button" data-toggle="collapse"
                  data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            2. 容器: 主要控制项目排列方式
          </button>
        </h2>
      </div>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
        <div class="card-body">
          <p><router-link to="/mainAxisAndCrossAxis">2.1 主轴(main axis)和交叉轴(cross axis)</router-link></p>
          <p><router-link to="/flexDirection">2.2 主轴方向(flex-direction)和交叉轴方向</router-link></p>
          <p><router-link to="/justifyContent">2.3 主轴对齐方式</router-link></p>
          <p><router-link to="/alignItems">2.4 交叉轴对齐方式</router-link></p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingThree">
        <h2 class="mb-0">
          <button class="btn btn-link text-left collapsed" type="button" data-toggle="collapse"
                  data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            3. 项目: 主要控制自身所占空间
          </button>
        </h2>
      </div>
      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div class="card-body">
          3.1 项目的放大比例
          3.2 项目的缩小比例
          3.3 项目缩放比例简写
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BennkyouList"
  }
</script>

<style scoped>

  .BennkyouList-accordion {
    margin-bottom: 2em;
  }

</style>