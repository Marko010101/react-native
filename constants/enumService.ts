export const enumService = {
  // Move Statuses
  moveStatuses: [
    { id: 1, name: "Open" },
    { id: 2, name: "Closed" },
    { id: 3, name: "Cancelled" },
    { id: 4, name: "Draft" },
  ],
  orderStatusesString: {
    notStarted: { text: "არ არის დაწყებული", value: 0 },
    declined: { text: "გაუქმებული", value: 1 },
    completed: { text: "დასრულებული", value: 2 },
    started: { text: "დაწყებული", value: 3 },
  },
  messageTypeEnum: [
    { id: 0, name: "None" },
    { id: 1, name: "Warning" },
    { id: 2, name: "Error" },
    { id: 3, name: "Info" },
    { id: 4, name: "Success" },
  ],
  // Order Statuses
  orderStatuses: [
    { id: 1, normName: "Pending", name: "არ არის დაწყებული" },
    { id: 2, normName: "Declined", name: "გაუქმებული" },
    { id: 3, normName: "Completed", name: "დასრულებული" },
    { id: 4, normName: "Started", name: "დაწყებული" },
  ],

  // Write-Off Methods
  writeOffMethods: [
    { id: 1, name: "მანუალური" },
    { id: 2, name: "ავტომატური (BackFlush)" },
  ],

  // Component Types
  componentTypes: [
    { id: 1, name: "ასაგროვებელი" },
    { id: 2, name: "საწარმოებელი" },
    { id: 3, name: "საინფორმაციო" },
    { id: 4, name: "ნედლეული" },
  ],

  // Operation Types
  operationTypes: [
    { id: -1, name: "none", normName: "none" },
    { id: 0, name: "წარმოება", normName: "production" },
    { id: 1, name: "გამოუყენებელი", normName: "notUsed" }, // აღარ ვიყენებთ
    { id: 2, name: "მარტივი აგროვება", normName: "simpleCollection" },
    { id: 3, name: "აგროვება", normName: "collection" },
    { id: 4, name: "დაშლა", normName: "division" },
    { id: 5, name: "მიწოდება", normName: "delivery" },
  ],

  // კოდები უნდა ემთხვეოდეს operationTypes-ს
  operationTypesForOrderCreate: [
    { id: 0, name: "წარმოება", normName: "Production" },
    { id: 2, name: "მარტივი აგროვება", normName: "SimpleCollection" },
    { id: 3, name: "აგროვება", normName: "Collection" },
    { id: 5, name: "მიწოდება", normName: "ProductionAndCollect" },
  ],
  // Rounding Up Roles
  roundingUpRoles: [
    { id: 0, name: "ზევით" },
    { id: 1, name: "ქვევით" },
  ],
  productionStatues: [
    { id: 0, name: "მიმდინარე" },
    { id: 1, name: "დასრულებული" },
    { id: 2, name: "სრულად ჩაცლილი" },
    { id: 3, name: "გაუქმებული" },
  ],

  SplitPermisionEnum: [
    { name: "არ არის დანიშნული", id: 0 },
    { name: "ავტომატური", id: 1 },
    { name: "მანუალური", id: 2 },
    { name: "არა", id: 3 },
  ],
  // Component Used Types
  componentUsedTypes: [
    { id: 1, name: "მანუალური" },
    { id: 2, name: "ავტომატური (BackFlush)" },
  ],

  // Object Types
  objectTypes: [
    { id: 1, name: "Accumulation" },
    { id: 2, name: "Production" },
    { id: 3, name: "TareToTare" },
    { id: 4, name: "TransferTara" },
    { id: 5, name: "MoveStock" },
    { id: 6, name: "MoveWithMobile" },
    { id: 7, name: "StockTara" },
    { id: 8, name: "StockEntry" },
    { id: 9, name: "ResetTare" },
    { id: 10, name: "WhstoTare" },
    { id: 11, name: "TareToWhs" },
    { id: 12, name: "WeightTare" },
    { id: 13, name: "AccumulationFromWhs" },
    { id: 14, name: "StockEntryWithWaybill" },
    { id: 15, name: "SendStock" },
    { id: 16, name: "Sale" },
    { id: 17, name: "PutIntoTare" },
    { id: 29, name: "TareToTareWithExtract" },
  ],
  objectTypesGeorgian: [
    { id: 1, name: "აგროვება" },
    { id: 2, name: "წარმოება" },
    { id: 3, name: "ტარიდან ტარაში გადაადგილება (ტერმინალზე)" },
    { id: 4, name: "TransferTara" },
    { id: 5, name: "ქვესაწყობიდან ქვესაწყობში გადაადგილება" },
    { id: 6, name: "MoveWithMobile" },
    { id: 7, name: "StockTara" },
    { id: 8, name: "საწყობში მიღება" },
    { id: 9, name: "ტარის გაცარიელება" },
    { id: 10, name: "ტარაში ჩადება" },
    { id: 11, name: "ტარიდან ამოღება" },
    { id: 12, name: "წონის დაზუსტება" },
    { id: 13, name: "აგროვება საწყობიდან" },
    { id: 14, name: "ზედნადებით მიღება" },
    { id: 15, name: "მოწოდება" },
    { id: 16, name: "რეალიზაცია" },
    { id: 17, name: "ნარჩენის მიღება ქვესაწყობში" },
    { id: 22, name: "მობილური აგროვება" },

    { id: 29, name: "ტარიდან ტარაში გადაადგილება წონით" },
  ],
  orderTypes: {
    collection: "აგროვება",
    simpleCollection: "მარტივი აგროვება",
    productionAndCollect: "აგროვება და წარმოება",
    production: "წარმოება",
    delivery: "მიწოდება",
    collectionProduction: "აგროვება და წარმოება",
  },
  orderTypeEnums: [
    { name: "წარმოება", id: 0, normName: "Production" },
    { name: "არ გამოიყენება", id: 1, normName: "NotUsed" },
    { name: "მარტივი აგროვება", id: 2, normName: "SimpleCollection" },
    { name: "აგროვება", id: 3, normName: "Collection" },
    { name: "დაყოფა", id: 4, normName: "Division" },
    { name: "მიწოდება", id: 5, normName: "Delivery" },
  ],

  // Antenna Types
  antennaTypes: [
    { id: 0, name: "None" },
    { id: 1, name: "Input" },
    { id: 2, name: "Output" },
    { id: 3, name: "General" },
    { id: 4, name: "Exit" },
    { id: 5, name: "InputOutput" },
    { id: 6, name: "Final" },
  ],

  userRoles: {
    0: "admin",
    1: "frontofficeall",
    2: "backofficeall",
  },

  // Deviation Types
  deviationTypes: [
    { id: 0, name: "%", normName: "percent" },
    { id: 1, name: "კგ", normName: "kilogram" },
  ],

  deviationTypesString: {
    percentage: "%",
    kilogram: "კგ",
  },

  NonIdentifiableTareTypeEnum: {
    0: "კაუჭი",
    1: "თარო",
    2: "ჯოხი",
    3: "ფორმა",
    4: "პალეტი",
    5: "ყუთი",
  },

  // Detailed Planning Statuses

  detailedPlanningStatuses: [
    { id: 0, name: "შექმნილი" },
    { id: 1, name: "დაწყებული (ორდერი)" },
    { id: 2, name: "დაწყებული (შესრულება)" },
    { id: 3, name: "დასრულებული" },
  ],
  // Tare Types
  tareTypes: [
    { name: "ურიკა", id: 0, normName: "Urika" },
    { name: "ჩანი", id: 1, normName: "Chani" },
    { name: "ჩარჩო", id: 2, normName: "Charcho" },
    { name: "ბოქსი", id: 3, normName: "Box" },
    { name: "პალეტი", id: 4, normName: "Palet" },
  ],

  // Tare Info statuses
  weightStatusEnum: [
    { name: "None", id: 0, normName: "None" },
    { name: "დაზუსტებული", id: 1, normName: "Ok" },
    { name: "დაუზუსტებელი", id: 2, normName: "Unkown" },
    { name: "მიმდინარე", id: 3, normName: "Pending" },
  ],

  ggddGenStatusEnum: [
    { name: "არ არის დაწყებული", id: 1, normName: "NotStarted" },
    { name: " დაიწყო", id: 2, normName: "GenStarted" },
    { name: "მანუალურად დასრულდა", id: 3, normName: "GenManualFinished" },
    { name: "დასრულდა", id: 4, normName: "GenFinished" },
  ],
  approvalStatus: [
    { id: 0, name: "arsPending" },
    { id: 1, name: "arsApproved" },
    { id: 2, name: "arsNotApproved" },
  ],

  waybillTypes: [
    { id: 1, name: "შიდა გადაზიდვა" },
    { id: 2, name: "ტრანსპორტირებით" },
    { id: 3, name: "ტრანსპორტირების გარეშე" },
    { id: 4, name: "დისტრიბუცია" },
    { id: 5, name: "უკან დაბრუნება" },
    { id: 6, name: "ქვე-ზედნადები" },
  ],

  orderGenerationRules: [
    { name: "განუსაზღვრელი", id: 0, normName: "None" },
    { name: "შვილი შეიქმნა - მშობელიც შეიქმნას", id: 1, normName: "Rule1" },
    { name: "შვილი დასრულდა მშობელი შეიქმნა", id: 2, normName: "Rule2" },
  ],
};
