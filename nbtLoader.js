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
        console.log(element.Slot + 0)
    });
}