<template>
  <a href="#" :class="`category ${selected ? 'is-selected' : ''}`" @click.prevent="handleClick">
    <img class="category__img" :src="image"/>
    <div class="category__name">{{ title }}</div>
  </a>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    image: {
      required: true,
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(){
      this.$emit('onClick')
    }
  }
};
</script>

<style lang="scss">
.category {
  height: 125px;
  width: 150px;
  border: 1px solid $color-grey-lightest;
  border-radius: 5px;
  background: $color-white;
  text-align: center;

  &__img {
    // margin: 10px 0;
    width: 100%;
    // height: 80px;
  }

  &__name {
    font-family: $base-font;
    font-size: 13px;
    font-weight: 700;
    color: $color-grey-dark;
    line-height: 18px;
    letter-spacing: 0.1px;
  }

  &.is-selected {
    border: 2px solid $color-primary;
  }
}
</style>
