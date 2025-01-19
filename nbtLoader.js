import { read } from "https://cdn.jsdelivr.net/npm/nbtify@2.1.0/+esm";

export const loadArrayBuffer = async (arrayBuffer) => {
    // Read the NBT binary with NBTify
    const data = await read(arrayBuffer);

    renderInventory(data.data.Inventory);
}

export const loadFile = async (url) => {

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    loadArrayBuffer(arrayBuffer);
}

const renderInventory = (inventory) => {
    inventory.forEach(element => {
        const slot = document.querySelector('.slot[data-slot="' + element.Slot + '"]:not(.shulker-slot)');
        renderSlot(slot, element);

        if(element.id.endsWith("shulker_box") && element.components && element.components["minecraft:container"]) {
            //console.log(element.components["minecraft:container"])
            renderShulker(slot, element.components["minecraft:container"]);
        }
    });
}

const renderShulker = (e, inventory) => {
    let i = 0;
    console.log(inventory)
    const inv = document.createElement("div");
    e.classList.add("shulker");
    inv.classList.add("inventory");
    for (let index = 0; index < 3; index++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let index2 = 0; index2 < 9; index2++) {
            const s = document.createElement("div");
            s.classList.add("slot");
            s.classList.add("shulker-slot");
            s.setAttribute("data-slot", i);
            row.appendChild(s);
            i++;
        }

        inv.appendChild(row);
    }
    e.appendChild(inv);


    inventory.forEach(element => {
        const slot = e.querySelector('.shulker-slot[data-slot="' + element.slot + '"]');
        renderSlot(slot, element.item);
        
        console.log(element)

        if(element.item.id.endsWith("shulker_box") && element.item.components && element.item.components["minecraft:container"]) {
            renderShulker(slot, element.item.components["minecraft:container"]);
        }
    });
}

const renderSlot = (slotElement, slotData) => {
    console.log(slotData)
    if(slotElement) {
        if(slotData.count > 1) {
            slotElement.setAttribute("data-amount", slotData.count);
        } else {
            slotElement.setAttribute("data-amount", "");
        }
        
        const img = document.createElement("img");
        img.src = getItem(slotData.id);

        slotElement.appendChild(img);

        const name = document.createElement("p");
        name.innerText = slotData.id.split(":")[1].split("_").map(v => capitalizeFirstLetter(v)).join(" ");
        if(slotData.components && slotData.components["minecraft:custom_name"] && slotData.id != "minecraft:mace") {
            name.innerText = slotData.components["minecraft:custom_name"].substring(1, slotData.components["minecraft:custom_name"].length - 1);
            name.classList.add("italic");
        }
        slotElement.appendChild(name);
    }
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const getItem = (id) => {
    let n = id.split(":")[1].split("_").map((v) => capitalizeFirstLetter(v)).join("_");
    n = changeId(n);
    return "https://minecraft.wiki/images/Invicon_" + n + "." + changeType(n, "png");
}

const changeId = (id) => {
    switch (id) {
        case "Flint_And_Steel":
            return "Flint_and_Steel"
    
        case "Splash_Potion":
            return "Splash_Water_Bottle"
        
        case "Gold_Block":
            return "Block_of_Gold"
        
        case "Iron_Block":
            return "Block_of_Iron"

        case "Slime_Ball":
            return "Slimeball"
        
        default:
            break;
    }

    if(id.endsWith("_Smithing_Template")) {
        return id.replace("_Smithing_Template", "");
    }

    if(id.endsWith("_Banner_Pattern")) {
        return "Banner_Pattern";
    }

    return id;
}

const changeType = (id, type) => {
    switch (id) {
        case "Enchanted_Golden_Apple":
            return "gif"
        
        case "Enchanted_Book":
            return "gif"
    }

    return type
}