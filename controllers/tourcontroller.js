// const fs = require('fs');
const Tour = require('../models/tourmodel')

const Api = require('../utils/api')



exports.aliastoptours = (req , res , next) => {
req.query.limit = '5';
req.query.sort = '-price';
req.query.fields = 'name,price,rating,summary,difficulty';
next();
}


// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getalltours = async (req, res) => {
try{ 
// alternate way to do it for down it is  simple one  building a query
console.log(req.query)

// advanced filtering
// object to string 
//const queryObj = { difficulty: 'easy', price: { gte: '500' } };
 

// Advanced filtering: Replace 'gte', 'gt', 'lte', 'lt' with '$gte', '$gt', '$lte', '$lt'
// Object.keys(queryObj).forEach(key => {
//   const value = queryObj[key];

//   // If the key has '[gte]', '[lte]', '[gt]', '[lt]', adjust to MongoDB operators
//   if (key.includes('[') && key.includes(']')) {
//     const operatorMatch = key.match(/\[(gte|gt|lte|lt)\]/);
    
//     if (operatorMatch) {
//       // Get the operator (gte, gt, lte, lt)
//       const operator = `$${operatorMatch[1]}`;

//       // Set the correct MongoDB query format
//       queryObj[key.split('[')[0]] = { [operator]: Number(value) };
//       delete queryObj[key];  // Remove the original parameter (e.g., duration[gte])
//     }
//   }
// });

// // Now `queryObj` has the proper MongoDB operators
//console.log(queryObj);  // Verify the updated query object

const feature = new Api(Tour.find() , req.query)
.filter()
.sort()
.limit()
.paginate()

const getmytours = await feature.query;  // used to execute query

//const getmytours = await Tour.find(queryObj);  // Query the database with the modified query object

//console.log(getmytours);
// { difficulty: "easy" , duration : {$gte : 5}} // this is the query object

  // console.log(req.query) // used to get query ? 
  //  const getmytours  = await Tour.find({ // query method in mangoose
  //    duration : 5 ,
  //    difficulty : 'easy'
  //  })

     ///// alternate way 

//  const getmytours = await Tour.find()
// .where('duration')
// .equals(5)
// .where('difficulty')
// .equals('easy')

  res.status(200).json({
    status: 'success',
    results: getmytours.length,
     data: {
      tours: getmytours
     },
   });
  } catch(err){
  res.status(404).json (
    {
      status : 'fail',
      message : err
    }
  )     
  }
};

exports.gettour = async (req, res) => {
  // console.log(req.params);

  // // converting a string into number

  // const id = req.params.id * 1;

  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid tour id ',
  //   });
  // }

  // find is used to find the data in the array by creating a new array
  // const tour = tours.find((el) => el.id === id);

try {
const singletour = await Tour.findById(req.params.id); // request parameter id coming from routes

  res.status(200).json({
     status: 'success',
     data: {
     singletour,
     },
   });

} catch (err){
  res.status(404).json (
    {
      status : 'fail',
      message : err
    }
  )
}

};

exports.createtour = async (req, res) => {
  // console.log(req.params);

  // // converting a string into number

  // const id = req.params.id * 1;

  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid tour id ',
  //   });
  // }

  // // find is used to find the data in the array by creating a new array
  // const tour = tours.find((el) => el.id === id);

  try {
const newTour = await Tour.create (req.body)  // direct coming data from tour directly made object and used here Tour already contains data
 
  res.status(200).json({
     status: 'success',
     data: {
      tours: newTour,
    },
   });
  } catch (err) {
  res.status(400).json({
    status : 'failed',
    message : err
  })
  }
};

exports.updatetour = async (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid tour id ',
  //   });
  // }

  try {
    
 const up  = await Tour.findByIdAndUpdate(req.params.id , req.body , {
  new : true, // updated document return
runValidators : true  // update against the scheme
} )

  res.status(200).json({
    status: 'success',
    data: {
      up ,
    },
  });
} catch(err) {
  res.status(400).json({
    status : 'failed',
    message : err
  })
}
};

exports.deletetour = async (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid tour id ',
  //   });
  // }
try {
 await Tour.findByIdAndDelete(req.params.id)
  res.status(200).json({
    status: 'success',
     data : null
  });
} catch(err){
  res.status(400).json({
    status : 'failed',
    message : err
  })
}
};


exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      // match is used to select or get data 
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {  // used to group data
          _id: null,
          averageRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message // Better error handling
    });
  }
};


// how it is working --->   getting the element after gettimg it grouping it after griuping it performing aggregate



exports.getmonthlyplan = async (req ,res) => {
  try {
const year = req.params.year; // give the year parameter from the url
const plan = await Tour.aggregate([
  {
    $unwind : '$startDates'
  } ,
  {
    $match : {
      startDates: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`),
      }
    }
  } ,
  {
    $group: {
      _id: { $Month: '$startDates' },
      numTourStarts: { $sum: 1 },
    }
  }
]
)
res.status(200).json({
  status: 'success',
data : plan ,
})
  } catch(err) {
    res.status(404).json({
      status : 'failed',
      message : err
      })
  }
}

// unwind it makes array element as a seperate document 
// for eg 1, [ad , dh] so it will br 1,ad and 1 , dh
// after seprating we can use grouping in it


