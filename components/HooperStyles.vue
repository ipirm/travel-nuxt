<template>
  <div></div>
</template>

<style lang="scss">
.hooper-next {
  margin-right: -2.9rem;
}

.hooper-prev {
  margin-left: -2.2rem;
}

.hooper-list {
  padding-left: 1rem;
}

// Home styles //////
#first-slider .hooper-list {
  padding-left: 0rem;
}

#first-slider .hooper-list .hooper-navigation .hooper-next {
  margin-right: 3rem;
  background-color: #ffffff;
  opacity: 0.5;
  border-radius: 100%;
  &:hover {
    opacity: 1;
  }
}

#first-slider .hooper-list .hooper-navigation .hooper-prev {
  margin-left: 3rem;
  background-color: #ffffff;
  opacity: 0.5;
  border-radius: 100%;
  &:hover {
    opacity: 1;
  }
}

@media (max-width: 700px) {
  #first-slider .hooper-list .hooper-navigation .hooper-prev,
  #first-slider .hooper-list .hooper-navigation .hooper-next {
    margin-top: 5rem;
  }
}
/////////////////

.hooper-indicator {
  background-color: rgba(157, 183, 199, 0.5);
  border-radius: 100%;
  height: 14px;
  width: 14px;
  margin-left: 4px;
  margin-right: 4px;
  &:hover {
    background-color: #094c74;
  }
}

.hooper-indicators > li > .is-active {
  background-color: #094c74;
}

@media (max-width: 436px) {
  .hooper-prev {
    padding: 0 0 0 0;
  }

  .hooper-next {
    padding: 0 0 0 0;
    margin-right: -1.9rem;
  }

  .hooper-list {
    padding-left: 5px;
  }
}
</style>
