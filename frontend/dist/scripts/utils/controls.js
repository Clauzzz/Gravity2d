class Controls {
  static selectedTab;

  static addTabsControls = () => {
    const tabElements = document.getElementsByClassName(
      "container_topbar_item"
    );
    Controls.selectedTab = document.getElementsByClassName(
      "container_topbar_item_selected"
    )[0];
    for (let i = 0; i < tabElements.length; i += 1) {
      tabElements[i].addEventListener("click", Controls.addTabControls);
    }
  };

  static addTabControls = (e) => {
    let element = e.target;
    while (element && !element.dataset.tab) {
      element = element.parentElement;
    }
    if (element && element.dataset.tab) {
      const currentPageId = element.dataset.tab;
      const previousPageId = Controls.selectedTab.dataset.tab;
      const previousPage = document.getElementById(previousPageId);
      previousPage.classList.remove("container_body_tab_selected");
      const currentPage = document.getElementById(currentPageId);
      currentPage.classList.add("container_body_tab_selected");

      Controls.selectedTab.classList.remove("container_topbar_item_selected");
      Controls.selectedTab = element;
      Controls.selectedTab.classList.add("container_topbar_item_selected");
    }
  };

  static addBodiesToList = () => {
    const container = document.getElementById("container_list_body");
    const objectIds = Array.from(container.children).map(
      (element) => element.dataset.id
    );
    const shownItems = Main.objects
      .sort((a, b) => {
        if (a.mass > b.mass) {
          return -1;
        } else if (a.mass < b.mass) {
          return 1;
        }
        return 0;
      })
      .slice(0, 10);

    const shownItemIds = shownItems.map((item) => item.id);
    if (JSON.stringify(shownItemIds) !== JSON.stringify(objectIds)) {
      if (shownItemIds.length) {
        if (container.children && container.children.length) {
          for (let i = 0; i < shownItemIds.length; i++) {
            if (shownItemIds[i] !== objectIds[i]) {
              const elementToRemove = container.children[i];
              elementToRemove.parentElement.insertBefore(
                Controls.constructObjectListItem(shownItems[i]),
                elementToRemove
              );
              container.removeChild(elementToRemove);
            }
            if(!shownItemIds[i]) {
              const elementToRemove = container.children[i];
              container.removeChild(elementToRemove);
            }
          }
        } else {
          for (let i = 0; i < shownItems.length; i += 1) {
            container.appendChild(
              Controls.constructObjectListItem(shownItems[i])
            );
          }
        }
      } else {
        while(container && container.children && container.children.length) {
          container.removeChild(container.children[0]);
        }
      }
    }
  };
  static toggleListItem = (object, container) => {
    for(let i = 0; i<Main.objects.length;i+=1) { 
      if(Main.objects[i].id === object.id) {
        canvas.objectSelected = Main.objects[i];
        canvas.objectCentered = Main.objects[i];
        break;
      }
    }

  };
  static selectObject = (object) => {
    const canvas = Main.canvases.getCanvas("space");
    for(let i = 0; i<Main.objects.length;i+=1) {
      if(Main.objects[i].id === object.id) {
        canvas.objectSelected = Main.objects[i];
        canvas.objectCentered = Main.objects[i];
        break;
      }
    }
  };
  static deleteObject = (object) => {
    const canvas = Main.canvases.getCanvas("space");
    if (canvas.objectSelected && object.id === canvas.objectSelected.id) {
      canvas.objectSelected = null;
      canvas.objectCentered = null;
    }
    const index = Main.objects.map((item) => item.id).indexOf(object.id);
    Main.objects.splice(index, 1);
  };
  static constructObjectListItem = (object) => {
    const itemElement = document.createElement("DIV");
    itemElement.dataset.id = object.id;
    itemElement.classList.add("container_list_item");

    const idElement = document.createElement("SPAN");
    idElement.innerHTML = object.id;
    const massElement = document.createElement("SPAN");
    massElement.innerHTML = object.mass;

    const expandCollapseButton = document.createElement("BUTTON");
    expandCollapseButton.classList.add("container_list_item_focus");
    const expandCollapseImage = document.createElement("IMG");
    if (object.expanded) {
      expandCollapseImage.src = "../../images/collapse.svg";
      itemElement.dataset.expanded = "1";
    } else {
      expandCollapseImage.src = "../../images/expand.svg";
      itemElement.dataset.expanded = "0";
    }
    expandCollapseButton.appendChild(expandCollapseImage);
    expandCollapseButton.addEventListener("click", () => {
      //   Controls.selectObject(object);
    });

    const focusButton = document.createElement("BUTTON");
    focusButton.classList.add("container_list_item_focus");
    const focusImage = document.createElement("IMG");
    focusImage.src = "../../images/target.svg";
    focusButton.appendChild(focusImage);
    focusButton.addEventListener("click", () => {
      Controls.selectObject(object);
    });

    const deleteButton = document.createElement("BUTTON");
    deleteButton.classList.add("container_list_item_delete");
    const deleteImage = document.createElement("IMG");
    deleteImage.src = "../../images/trash.svg";
    deleteButton.appendChild(deleteImage);
    deleteButton.addEventListener("click", () => {
      Controls.deleteObject(object);
    });

    itemElement.appendChild(idElement);
    // itemElement.appendChild(massElement);
    // itemElement.appendChild(expandCollapseButton);
    itemElement.appendChild(focusButton);
    itemElement.appendChild(deleteButton);
    return itemElement;
  };
}
