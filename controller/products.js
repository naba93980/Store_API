const ProductsCollection = require("../model/products");

const getAllProductsStatic = async (req, res) => {
  // const products = await ProductsCollection.find({
  //   name: { $regex: "^a", $options: "i" },
  // });

  // const products = await ProductsCollection.find({}).sort("-name price");

  // const products = await ProductsCollection.find({}).select("name price");

  // const products = await ProductsCollection.find({})
  //   .select("name price")
  //   .skip(2)
  //   .limit(20);

  // const products = await ProductsCollection.find({ price: { $lt: 50 } });

  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, page, limit, numericFilters } =
    req.query;
  const queryObject = {};

  // adding filter properties --- /api/v1/products?featured=false&name=a&company=ikea
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // numeric filters  ---  /api/v1/products?numericFilters=price>100,rating>=4
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /(<=|>=|<|>|=)/g;
    let numericFiltersNew = numericFilters.replace(regEx, (match) => {
      return `-${operatorMap[match]}-`;
    });

    const options = ['price', 'rating'];
    const numericFilterList = numericFiltersNew.split(",");
    numericFilterList.forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: +value };
      }
    })
  }
  let productsPromise = ProductsCollection.find(queryObject);


  // sorting queries --- /api/v1/products?sort=-name,-price
  if (sort) {
    const sortList = sort.split(",").join(" ");
    productsPromise = productsPromise.sort(sortList);
  }


  // select queries  ---  /api/v1/products?fields=company,rating
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    productsPromise = productsPromise.select(fieldsList);
  }

  // pagination ---  /api/v1/products?limit=5&page=3
  const pageNo = Number(page) ?? 1;
  const limitNo = Number(limit) ?? 10;
  const skipNo = (pageNo - 1) * limitNo;
  productsPromise.skip(skipNo).limit(limitNo);

  const products = await productsPromise;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
