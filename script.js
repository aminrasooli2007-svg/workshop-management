let workshops = [
    {
        id: 1,
        customer: "Ahmad",
        garment: "Shirt",
        price: 400,
        status: "Pending"
    },
    {
        id: 2,
        customer: "Maryam",
        garment: "Dress",
        price: 1200,
        status: "Ready"
    },
    {
        id: 3,
        customer: "Farid",
        garment: "Trousers",
        price: 600,
        status: "Pending"
    },
    {
        id: 4,
        customer: "Laila",
        garment: "Dress",
        price: 1500,
        status: "Pending"
    },
    {
        id: 5,
        customer: "Omar",
        garment: "Shirt",
        price: 500,
        status: "Ready"
    }
];

const tablebody = document.querySelector('#orders-table-body')
function renderWorkshops(list) {

    list.map(workshop => { 

        const row = document.createElement("tr")

        const cell = document.createElement("td") 
        cell.textContent = workshop.customer 
        row.append(cell) 

        const germaCell = document.createElement("td") 
        germaCell.textContent = workshop.garment 
        row.append(germaCell) 

        const priceCell = document.createElement("td") 
        priceCell.textContent = workshop.price 
        row.append(priceCell) 

        const statusCell = document.createElement("td") 
        statusCell.textContent = workshop.status 
        row.append(statusCell) 

        const actionCell = document.createElement("td")
        const button  = document.createElement("button")
        button.textContent = "Delete"
        actionCell.append(button)
        row.append(actionCell)
        button.addEventListener('click' , ()=>{
            const workshopid = workshop.id
            const result = workshops.filter(item =>{
                return item.id !== workshopid
            })
            workshops = result
            tablebody.innerHTML = ""
            renderWorkshops(workshops)
            updateSummary()
        })

        tablebody.append(row)
    })
}
renderWorkshops(workshops)

const totalOrder = document.querySelector("#total-orders")
const pendingOrder = document.querySelector("#pending-orders")
const totalPriceElement = document.querySelector("#total-price")

function updateSummary(){

    totalOrder.textContent = workshops.length
    
    const pendingWorkshops = workshops.filter(workshops => {
        return workshops.status === "Pending"
    })
    pendingOrder.textContent = pendingWorkshops.length
    
    const totalprice = workshops.reduce((total, workshops) => {
        return total + workshops.price
    }, 0) 
    totalPriceElement.textContent = totalprice 
}
updateSummary()

const searchInput = document.querySelector("#search")
searchInput.addEventListener("input", () => {
    const result = workshops.filter(workshop => {
        return workshop.customer.toLowerCase().includes(searchInput.value.toLowerCase())

    })
    tablebody.innerHTML = ""

    renderWorkshops(result)
})

const statusFilter = document.querySelector("#status-filter")
console.log(statusFilter);

statusFilter.addEventListener("change" , ()=>{
    const status = statusFilter.value
    tablebody.innerHTML = ""
      if (status === "all") {
        renderWorkshops(workshops)
    } else {
         const result = workshops.filter(workshop =>{
            return workshop.status === status
        })
        renderWorkshops(result)
    }
})

const orderForm = document.querySelector("#order-form")
const customerInput = document.querySelector("#customer")
const garmentInput = document.querySelector("#garment")
const priceInput = document.querySelector("#price")

orderForm.addEventListener("submit" , (event)=>{
    event.preventDefault()
    const customer = customerInput.value
    const garment = garmentInput.value
    const price = Number(priceInput.value)

    const newWorkshope ={
        id:workshops.length + 1,
        customer: customer,
        garment: garment,
        price: price,
        status: "Pending"
    }
    workshops.push(newWorkshope)
    tablebody.innerHTML = ""

    renderWorkshops(workshops)
    updateSummary()
    orderForm.reset()
})
