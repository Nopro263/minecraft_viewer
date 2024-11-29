import { read } from "https://cdn.jsdelivr.net/npm/nbtify@2.1.0/+esm";

export const loadFile = async (url) => {

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    // Read the NBT binary with NBTify
    const data = await read(arrayBuffer);

    renderInventory(data.data.Inventory);
}

const renderInventory = (inventory) => {
    inventory.forEach(element => {
        const slot = document.querySelector('.slot[data-slot="' + element.Slot + '"]');
        renderSlot(slot, element);
    });
}

const renderSlot = (slotElement, slotData) => {
    if(slotElement) {
        if(slotData.count > 1) {
            slotElement.setAttribute("data-amount", slotData.count);
        } else {
            slotElement.setAttribute("data-amount", "");
        }
        
        const img = document.createElement("img");
        img.src = getItem(slotData.id);

        slotElement.appendChild(img);
    }
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const getItem = (id) => {
    let n = id.split(":")[1].split("_").map((v) => capitalizeFirstLetter(v)).join("_");
    n = changeId(n);
    return "https://minecraft.wiki/images/Invicon_" + n + ".png";
}

const changeId = (id) => {
    switch (id) {
        case "Flint_And_Steel":
            return "Flint_and_Steel"
    
        default:
            break;
    }

    return id;
}