<template>
  <!-- 控制器 -->
  <ul class="readerControlBar">
    <li @click="reading.index > 0?reading.index-=1:reading.index=0" class="readerControlBarItem">
      <p>
        <img
          src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik0xMCw1MDhsNDAyLjUsNDkwTDU3MCw4NThMMzYwLDYxM2g2MzBWNDAzSDM2MGwyMTAtMjQ1TDQxMi41LDE4TDEwLDUwOHoiIHN0eWxlPSJmaWxsOiNBQ0FDQUMiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPiAg"
        >
      </p>
    </li>
    <li @click="show.catalogue = !show.catalogue" class="readerControlBarItem">
      <p>
        <img
          v-if="!show.catalogue"
          src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik00NjkuNCw3ODMuNlYxNDAuNWgtNDUuOWMtMS43LDEuMS02LjksNC43LTE1LjcsMTAuNmMtOC44LDYtMTQuMiw5LjYtMTYuMiwxMS4xYy0yLDEuNC02LjcsNC41LTE0LDkuNHMtMTIuNiw3LjgtMTUuNyw4LjljLTMuMSwxLjEtNy45LDMuNC0xNC41LDYuOGMtNi41LDMuNC0xMS45LDUuNS0xNi4yLDYuNGMtNC4zLDAuOC05LjYsMi4xLTE2LjIsMy44Yy02LjUsMS43LTEyLjksMi44LTE5LjEsMy40Yy02LjIsMC42LTEyLjgsMC45LTE5LjYsMC45SDEwdjY3My44aDI3NS42YzE0LjcsMCwzMS42LTEuNiw1MC42LTQuN2MxOS0zLjEsMzktNy45LDYwLTE0LjVjMjEtNi41LDM4LjQtMTYuMiw1Mi4zLTI4LjlDNDYyLjQsODE0LjcsNDY5LjQsODAwLjEsNDY5LjQsNzgzLjZ6IE05OTAsODc1LjVWMjAxLjhINzIzLjdjLTYuOCwwLTEzLjMtMC4zLTE5LjYtMC45Yy02LjItMC42LTEyLjYtMS43LTE5LjEtMy40Yy02LjUtMS43LTExLjktMy0xNi4yLTMuOGMtNC4zLTAuOS05LjYtMy0xNi4yLTYuNGMtNi41LTMuNC0xMS4zLTUuNy0xNC41LTYuOGMtMy4xLTEuMS04LjQtNC4xLTE1LjctOC45cy0xMi4xLTcuOS0xNC05LjRjLTItMS40LTcuNC01LjEtMTYuMi0xMS4xYy04LjgtNi0xNC05LjUtMTUuNy0xMC42aC00NS45djY0My4xYzAsMTYuNCw2LjksMzEuMSwyMC44LDQzLjhjMTMuOSwxMi44LDMxLjMsMjIuNCw1Mi4zLDI4LjljMjEsNi41LDQxLDExLjMsNjAsMTQuNXMzNS45LDQuNyw1MC42LDQuN0g5OTB6IiBzdHlsZT0iZmlsbDojQUNBQ0FDIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA=="
        >
        <img
          v-if="show.catalogue"
          src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik00NjkuNCw3ODMuNlYxNDAuNWgtNDUuOWMtMS43LDEuMS02LjksNC43LTE1LjcsMTAuNmMtOC44LDYtMTQuMiw5LjYtMTYuMiwxMS4xYy0yLDEuNC02LjcsNC41LTE0LDkuNHMtMTIuNiw3LjgtMTUuNyw4LjljLTMuMSwxLjEtNy45LDMuNC0xNC41LDYuOGMtNi41LDMuNC0xMS45LDUuNS0xNi4yLDYuNGMtNC4zLDAuOC05LjYsMi4xLTE2LjIsMy44Yy02LjUsMS43LTEyLjksMi44LTE5LjEsMy40Yy02LjIsMC42LTEyLjgsMC45LTE5LjYsMC45SDEwdjY3My44aDI3NS42YzE0LjcsMCwzMS42LTEuNiw1MC42LTQuN2MxOS0zLjEsMzktNy45LDYwLTE0LjVjMjEtNi41LDM4LjQtMTYuMiw1Mi4zLTI4LjlDNDYyLjQsODE0LjcsNDY5LjQsODAwLjEsNDY5LjQsNzgzLjZ6IE05OTAsODc1LjVWMjAxLjhINzIzLjdjLTYuOCwwLTEzLjMtMC4zLTE5LjYtMC45Yy02LjItMC42LTEyLjYtMS43LTE5LjEtMy40Yy02LjUtMS43LTExLjktMy0xNi4yLTMuOGMtNC4zLTAuOS05LjYtMy0xNi4yLTYuNGMtNi41LTMuNC0xMS4zLTUuNy0xNC41LTYuOGMtMy4xLTEuMS04LjQtNC4xLTE1LjctOC45cy0xMi4xLTcuOS0xNC05LjRjLTItMS40LTcuNC01LjEtMTYuMi0xMS4xYy04LjgtNi0xNC05LjUtMTUuNy0xMC42aC00NS45djY0My4xYzAsMTYuNCw2LjksMzEuMSwyMC44LDQzLjhjMTMuOSwxMi44LDMxLjMsMjIuNCw1Mi4zLDI4LjljMjEsNi41LDQxLDExLjMsNjAsMTQuNXMzNS45LDQuNyw1MC42LDQuN0g5OTB6IiBzdHlsZT0iZmlsbDojMzM0NzVmIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA=="
        >
      </p>
    </li>
    <li @click="reading.collected = !reading.collected" class="readerControlBarItem">
      <p>
        <img
          v-if="!reading.collected"
          src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik01MDAsMTc1LjVMMjAyLjUsMThsLTcwLDcwTDIyMCw0MDNMMTAsNjMwLjVMNDUsNzE4aDI2Mi41bDE0OC44LDI4MGg4Ny41bDE0OC44LTI4MEg5NTVsMzUtODcuNUw3ODAsNDAzbDg3LjUtMzE1bC03MC03MEw1MDAsMTc1LjV6IiBzdHlsZT0iZmlsbDojQUNBQ0FDIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA=="
        >
        <img
          v-if="reading.collected"
          src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik01MDAsMTc1LjVMMjAyLjUsMThsLTcwLDcwTDIyMCw0MDNMMTAsNjMwLjVMNDUsNzE4aDI2Mi41bDE0OC44LDI4MGg4Ny41bDE0OC44LTI4MEg5NTVsMzUtODcuNUw3ODAsNDAzbDg3LjUtMzE1bC03MC03MEw1MDAsMTc1LjV6IiBzdHlsZT0iZmlsbDojMzM0NzVmIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA=="
        >
      </p>
    </li>
    <li
      @click="reading.index < countChapters?reading.index+=1:reading.index=countChapters"
      class="readerControlBarItem"
    >
      <p>
        <img
          src="data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTAwOCkiPjxwYXRoIGQ9Ik01ODcuNSw5OThMOTkwLDUwOEw1ODcuNSwxOEw0MzAsMTU4bDIxMCwyNDVIMTB2MjEwaDYzMEw0MzAsODU4TDU4Ny41LDk5OHoiIHN0eWxlPSJmaWxsOiNBQ0FDQUMiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPiAg"
        >
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "readerControlBar",
  props: {
    reading: Object,
    show: Object
  },
  computed: {
    countChapters: function() {
      if (this.reading.chapters) {
        if (this.reading.chapters.mixToc) {
          return this.reading.chapters.mixToc.chapters.length - 1;
        }
      }
    }
  }
};
</script>

<style scoped>
.readerControlBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5%;

  background-color: rgba(250, 235, 215, 0.616);

  display: flex;
  justify-content: space-between;
}

.readerControlBarItem {
  position: relative;
  width: 25%;
  cursor: pointer;
}

.readerControlBarItem p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.readerControlBarItem p img {
  width: 0.9rem;
  height: 0.9rem;
}
</style>
