<template>
  <div>
    <ul class="pagination">
      <li class="pagination__item">
        <button
          type="button"
          class="btn btn-small btn-default m-1"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          First
        </button>
      </li>
      <li class="pagination__item">
        <button
          type="button"
          class="btn btn-small btn-info m-1"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          Previous
        </button>
      </li>
      <li class="pagination__item" v-for="page in pages" :key="page.name">
        <button
          type="button"
          class="btn btn-small btn-default m-1"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
      <li class="pagination__item">
        <button
          type="button"
          class="btn btn-small btn-info m-1"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
          Next
        </button>
      </li>
      <li class="pageination__item">
        <button
          type="button"
          class="btn btn-small btn-default m-1"
          @click="onClickLastPage"
          :disabled="isInLastPage"
        >
          Last
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    total: {
      total: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons
      }
      // When in between
      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return range
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage) || 0
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pageChanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pageChanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pageChanged', page)
    },
    onClickNextPage() {
      this.$emit('pageChanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pageChanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  list-style-type: none;
}
.pagination__item {
  display: inline-block;
}
.active {
  background-color: #4aae98;
  color: #fff;
}
</style>
