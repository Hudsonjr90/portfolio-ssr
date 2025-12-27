<template>
    <button>
        <div class="project_item" :class="{ active: isActive }">
            <span class="count">{{ index + 1 }}</span>
            <h4 class="title">{{ project.title }}</h4>
            <p class="simple_description">{{ project.short_description }}</p>
        </div>
    </button>

</template>

<script>
export default {

    data() {
        return {

        }
    },
    props: ['project', "index", "isActive"]
}
</script>

<style scoped>

.project_item,
span,
h4,
p {
    transition: 0.4s;
  position: relative;
  z-index: 1;
}
.project_item::after{
  content: " ";
  background: url("/img/img_1.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  opacity: 0;
  overflow: hidden;
}

.project_item:hover,
.project_item.active {
    color: var(--bg-color);
    //background: url("/img/img_1.png");
}

.project_item:hover::after,
.project_item.active::after {
opacity: 1;

}



.project_item {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    min-width: 400px;
    text-align: center;
    padding: 8vh 4rem;
    background-color: var(--bg-color);

}

.mobile-panel .project_item {
    height: unset;

}

span {
    font-size: 350px;
    font-weight: 600;
}

h4 {
    /* font-size: 35px; */
    text-transform: uppercase;
    font-weight: 500;

}
button{
  width: 100%;
}

@media screen and (max-width: 768px) {
    .project_item:hover {
      color: var(--text-color);
    }

  .project_item:hover::after {
    opacity: 0;
  }
  .project_item.active:after{
    opacity: 1;
  }
    .project_item.active:hover:after {
      opacity: 1;

    }
  .project_item.active, .project_item.active:hover {
    color: red;
  }
  span {
    font-size: 200px;
    font-weight: 600;
  }
}
</style>