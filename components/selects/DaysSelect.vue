<template>
    <div class="container-select">

    </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .container-select {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        justify-content: space-between;
        position: relative;
        color: $dark-secondary;
    }

    .wrapper-select {
        padding: 5px 0 5px 10px;
        background-color: white;
        > label{
            padding: 10px;
            font-weight: 600;
        }
        .option:hover{
            background-color: transparent;
        }

        .label-checkbox + .hint{
            padding-left: 27px;
            background-color: transparent !important;
            font-size: 12px;
            color: #999;
        }

    }

    .active-select-wrapper {
        border-color: $orange;
    }

    .right-container {
        display: flex;
    }

    .options {
        position: absolute;
        margin-top: 45px;
        background-color: white;
        width: 100%;
        z-index: 8;
        max-height: 200px;
        overflow: auto;
        border-radius: 4px;
        box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.4);
    }

    .option {
        padding: 10px;
        cursor: pointer;

        &
        :hover {
            background-color: #e6edf1;
        }

    }

    .item-select-active {
        background-color: rgba($orange, 0.5);
    }

    .right-text {
        font-weight: 700;
        color: #9db7c7;
        padding-right: 5px;
    }

    .checkbox {
        margin-right: 4px;
        background: white;
    }

    .right-select-value {
        color: $dark-secondary;
        font-weight: 700;
        margin-right: 6px;
    }

</style>
