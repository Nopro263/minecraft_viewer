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
        console.log(slot, element);
        if(slot) {
            //slot.innerHTML = element.count;
            if(element.count > 1) {
                slot.setAttribute("data-amount", element.count);
            } else {
                slot.setAttribute("data-amount", "");
            }
            
        }
    });
}