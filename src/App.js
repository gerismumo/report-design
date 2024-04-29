import { jsPDF } from "jspdf";

const content = [
  { name: "Item 1", quantity: 2, cost: 10.00 },
  { name: "Item 2", quantity: 1, cost: 15.50 },
  { name: "Item 1", quantity: 2, cost: 10.00 },
  { name: "Item 2", quantity: 1, cost: 15.50 },
  // { name: "Item 1", quantity: 2, cost: 10.00 },
  // { name: "Item 2", quantity: 1, cost: 15.50 },
  // { name: "Item 2", quantity: 1, cost: 15.50 },
  // { name: "Item 1", quantity: 2, cost: 10.00 },
  // { name: "Item 2", quantity: 1, cost: 15.50 },
  // { name: "Item 2", quantity: 1, cost: 15.50 },
  // { name: "Item 1", quantity: 2, cost: 10.00 },
  // { name: "Item 2", quantity: 1, cost: 15.50 },
];

const menuItems = [
  {name: "Cereal Wholemeal Bread ", quantity: 2, cost: 740.00},
  {name: "Egg in Bagel", quantity: 1, cost: 600.00},
  {name: "Mini Focaccia", quantity: 4, cost: 600.00},
  {name: "Chocolate Chip Cookie", quantity: 5, cost: 500.00},
  {name: "Blueberry Loaf Cake Slice", quantity: 1, cost: 400.00},
  {name: "Chocolate Donut", quantity: 1, cost: 350.00},
  {name: "Sweet halla Bread", quantity: 1, cost: 325.00},
  {name: "Cappuccino Single", quantity: 1, cost: 200.00},
  {name: "Vimto Sparkling", quantity: 1, cost: 120.00},
]

function App() {
  const doc = new jsPDF();

  //title
  const title = "Cashier Sales Report";
  const fontSizeTitle = 24;
  const textWidthTitle = doc.getStringUnitWidth(title) * fontSizeTitle / doc.internal.scaleFactor;
  const xTitle = (doc.internal.pageSize.getWidth() - textWidthTitle) / 2;
  doc.setFontSize(fontSizeTitle);
  doc.text(title, xTitle, 15);

  //email
  const email = "company@example.com";
  const xEmail = 10; 
  const yEmail = 25; 
  doc.setFontSize(12);
  doc.text(email, xEmail, yEmail);

  //horizontal line
  const lineY = yEmail + 3; 
  doc.setLineWidth(0.2);
  doc.line(xEmail, lineY, doc.internal.pageSize.getWidth() - 10, lineY);

  //date

  const Date = "Date:Monday, April 29, 2024";
  const xDate = 10; 
  const yDate = 35; 
  doc.setFontSize(12);
  doc.text(Date, xDate, yDate);

 //horizontal line
  doc.line(xDate, 38, doc.internal.pageSize.getWidth() - 10, 38);

  const summaryTitle = "Receipt Summary"
  doc.setFontSize(18)
  doc.text(summaryTitle, 10, 45);

  //horizontal line
  doc.line(10, 48, doc.internal.pageSize.getWidth() - 10, 48);

  //#pay
  const payHashTag = "#Pay";
  doc.setTextColor(128);
  doc.setFontSize(12);
  doc.text(payHashTag, 10, 55);

  //order summary
  const orderSummary = "Order Summary";
  doc.setTextColor(0); 
  doc.setFontSize(18);
  doc.text(orderSummary, 10, 65);

  //horizontal line
  doc.line(10, 68, doc.internal.pageSize.getWidth() - 10, 68);


  // Set column widths
  const columnWidth = (doc.internal.pageSize.getWidth()) / 3;
  const startX1 = 10;
  const centerX = doc.internal.pageSize.getWidth() / 2;
  const startX3 = doc.internal.pageSize.getWidth() - 22;

  
  let yPosition = 75; 
  content.forEach(item => {
    doc.setFontSize(12);
    doc.setTextColor(128);
    doc.text(item.name, startX1, yPosition); 
    doc.text(item.quantity.toString(), centerX, yPosition);
    doc.text(item.cost.toFixed(2), startX3, yPosition); 

    yPosition += 8; 
  });

  //calculate the total cost
  function calculateTotals(content) {
    let totalQuantity = 0;
    let totalCost = 0;
    content.forEach(item => {
      totalQuantity += item.quantity;
      totalCost += item.cost;
    });
    return { totalQuantity, totalCost };
  }
  const totals = calculateTotals(content);

  //display the total cost

  // yPosition; 
  doc.setTextColor(0);
  doc.text("Total", startX1, yPosition);
  doc.setTextColor(0);
  doc.text(totals.totalQuantity.toString(), centerX, yPosition); 
  doc.setTextColor(0);
  doc.text(totals.totalCost.toFixed(2), startX3, yPosition);

  //menu items

  yPosition += 10;
  const menuItemsTitle = "Menu Item"
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text(menuItemsTitle,10, yPosition);

  yPosition += 3;
  doc.line(10, yPosition, doc.internal.pageSize.getWidth() - 10, yPosition);

  //menu items content
  yPosition += 6;
  menuItems.forEach(item => {
    doc.setFontSize(12);
    doc.setTextColor(128);
    doc.text(item.name, startX1, yPosition); 
    doc.text(item.quantity.toString(), centerX, yPosition);
    doc.text(item.cost.toFixed(2), startX3, yPosition); 

    yPosition += 8; 
  });

  //Tax summary
  yPosition += 3;
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("Tax Summary",10, yPosition);

  yPosition += 3;
  doc.line(10, yPosition, doc.internal.pageSize.getWidth() - 10, yPosition);

  const taxSummaryDetails = [
    {name: "VAT", amount: 446.21},
    {name: "CTL", amount: 0.00},
  ]

  yPosition += 6;
  taxSummaryDetails.forEach(item => {
    doc.setFontSize(12);
    doc.setTextColor(128);
    doc.text(item.name, startX1, yPosition); 
    doc.text(item.amount.toFixed(2), startX3, yPosition); 

    yPosition += 8; 
  });

  yPosition += 3;
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("Payment Summary",10, yPosition);

  yPosition += 3;
  doc.line(10, yPosition, doc.internal.pageSize.getWidth() - 10, yPosition);

  //payment summary

  const paymentSummaryDetails = [
    {name: "Cash",transations: 4, amount: 1000.00},
    {name: "Mpesa", transations: 2, amount: 1165.00},
    {name: "Card", transations: 1, amount: 300.00},
  ]

  yPosition += 6;
  paymentSummaryDetails.forEach(payment => {
    doc.setFontSize(12);
    doc.setTextColor(128);
    doc.text(payment.name, startX1, yPosition); 
    doc.text(payment.transations.toString(), centerX, yPosition);
    doc.text(payment.amount.toFixed(2), startX3, yPosition); 

    yPosition += 8; 
  });

  function calculatePaymentSummaryTotals(paymentSummaryDetails) {
    let totalTransactions = 0;
    let totalAmount = 0;
    paymentSummaryDetails.forEach(payment => {
      totalTransactions += payment.transations;
      totalAmount += payment.amount;
    });
    return { totalAmount, totalTransactions };
  }
  const paymentTotal = calculatePaymentSummaryTotals(paymentSummaryDetails);

  doc.setTextColor(0);
  doc.text("Total", startX1, yPosition);
  doc.setTextColor(0);
  doc.text(paymentTotal.totalTransactions.toString(), centerX, yPosition); 
  doc.setTextColor(0);
  doc.text(paymentTotal.totalAmount.toFixed(2), startX3, yPosition);

  //User Wise Sales
  yPosition += 10;
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("User Wise Sales",10, yPosition);

  yPosition += 3;
  doc.line(10, yPosition, doc.internal.pageSize.getWidth() - 10, yPosition);

  const userWiseSalesDetails = [
    {name: "Abigail Ukumu", quantity: paymentTotal.totalTransactions, amount: paymentTotal.totalAmount},
  ]

  yPosition += 6;
  userWiseSalesDetails.forEach(detail => {
    doc.setFontSize(12);
    doc.setTextColor(128);
    doc.text(detail.name, startX1, yPosition); 
    doc.text(detail.quantity.toString(), centerX, yPosition);
    doc.text(detail.amount.toFixed(2), startX3, yPosition); 

    yPosition += 8; 
  });

  //total user User Wise Sales
  doc.setTextColor(0);
  doc.text("Total", startX1, yPosition);
  doc.setTextColor(0);
  doc.text(paymentTotal.totalTransactions.toString(), centerX, yPosition); 
  doc.setTextColor(0);
  doc.text(paymentTotal.totalAmount.toFixed(2), startX3, yPosition);

  const handleClick = () => {
    doc.save("report.pdf");
  };

  return (
    <div className="App">
      <button
      onClick={() => handleClick()}
      >
        Dowload Report
      </button>
    </div>
  );
}

export default App;
