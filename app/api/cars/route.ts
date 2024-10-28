import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB);

    // Retrieve query parameters
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const year = searchParams.get('year');
    const km = searchParams.get('km');
    const stocknumber = searchParams.get('stocknumber');
    const intcolore = searchParams.get('intcolore');
    const transtype = searchParams.get('transtype');
    const fuel = searchParams.get('fuel');
    const drivetrain = searchParams.get('drivetrain');
    const searchQuery = searchParams.get('q'); // General search query
    const listTransTypes = searchParams.get('listTransTypes');
    const listFuelTypes = searchParams.get('listFuelTypes');
    const listBodyTypes = searchParams.get('listBodyTypes');
    const listDrivetrainTypes = searchParams.get('listDrivetrainTypes');
    const listExtColorf = searchParams.get('listExtColorf'); // New: List distinct external colors
    const colorf = searchParams.get('colorf');
    const category = searchParams.get('category');
	const maxKm = searchParams.get('maxKm'); // New: Mileage filter parameter


    // New: Parameters for price filtering
    const getPriceRange = searchParams.get('getPriceRange');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    // New: Parameters for year filtering
    const getYearRange = searchParams.get('getYearRange');
    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');

    // If the request is for the distinct transmission types
    if (listTransTypes) {
      const transmissionTypes = await db.collection('inventory').distinct('transtype');
      return NextResponse.json({ transmissionTypes });
    }

    if (listFuelTypes) {
      const FuelTypes = await db.collection('inventory').distinct('fuel');
      return NextResponse.json({ FuelTypes });
    }

    // if (listBodyTypes) {
      // Fetch distinct values
    //  const distinctCategories = await db.collection('inventory').distinct('category');
      
      // Normalize values to lowercase
    //  const normalizedCategories = distinctCategories.map(category => category.toLowerCase());
      
      // Remove duplicates if any
    //  const uniqueCategories = Array.from(new Set(normalizedCategories));
      
    //  return NextResponse.json({ categories: uniqueCategories });
   // }

    if (listBodyTypes) {
      const BodyTypes = await db.collection('inventory').distinct('category');
      return NextResponse.json({ BodyTypes });
    }


    if (listDrivetrainTypes) {
      const DrivetrainTypes = await db.collection('inventory').distinct('drivetrain');
      return NextResponse.json({ DrivetrainTypes });
    }

    if (listExtColorf) { // New: Fetch distinct external colors
      const ExternalColorf = await db.collection('inventory').distinct('colorf');
      return NextResponse.json({ ExternalColorf });
    }

    // Fetch min/max price if requested
    if (getPriceRange) {
      const priceRange = await db.collection('inventory').aggregate([
        {
          $group: {
            _id: null,
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" }
          }
        }
      ]).toArray();

      if (priceRange.length > 0) {
        return NextResponse.json({
          minPrice: priceRange[0].minPrice,
          maxPrice: priceRange[0].maxPrice
        });
      } else {
        return NextResponse.json({
          minPrice: 0,
          maxPrice: 0
        });
      }
    }

    // Fetch min/max year if requested
    if (getYearRange) {
      const yearRange = await db.collection('inventory').aggregate([
        {
          $group: {
            _id: null,
            minYear: { $min: "$year" },
            maxYear: { $max: "$year" }
          }
        }
      ]).toArray();

      if (yearRange.length > 0) {
        return NextResponse.json({
          minYear: yearRange[0].minYear,
          maxYear: yearRange[0].maxYear
        });
      } else {
        return NextResponse.json({
          minYear: 0,
          maxYear: 0
        });
      }
    }

    // Build a query object based on provided parameters
    const query: any = {};
   if (make) {
      query['make'] = new RegExp(`^${make}$`, 'i'); // Case-insensitive regex
    }
    if (model) {
      query['model'] = new RegExp(`^${model}$`, 'i'); // Case-insensitive regex
    }
    if (year) query['year'] = parseInt(year);
    if (transtype) query['transtype'] = transtype;
    if (drivetrain) query['drivetrain'] = drivetrain;
    if (km) query['km'] = parseInt(km);
    if (stocknumber) query['stocknumber'] = stocknumber;
    if (intcolore) query['intcolore'] = intcolore;
    if (fuel) query['fuel'] = fuel;
    if (category) {
      // Case-insensitive matching for category
      query['category'] = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    if (colorf) query['colorf'] = colorf;


	// Add mileage filter to the query if provided
    if (maxKm) {
      const maxMileage = parseInt(maxKm, 10);
      if (!isNaN(maxMileage)) {
        query['km'] = { $lte: maxMileage };
      }
    }

    // Add price range to the query if provided
    if (minPrice || maxPrice) {
      query['price'] = {};
      if (minPrice) query['price']['$gte'] = parseFloat(minPrice);
      if (maxPrice) query['price']['$lte'] = parseFloat(maxPrice);
    }

    if (minYear || maxYear) {
      query['year'] = {};
      if (minYear) query['year']['$gte'] = parseFloat(minYear);
      if (maxYear) query['year']['$lte'] = parseFloat(maxYear);
    }

    // If a general search query is provided, add it to the query object
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i'); // Case-insensitive regex search
      query['$or'] = [
        { make: regex },
        { model: regex },
        { year: regex },
        { stocknumber: regex },
      ];
    }

    // Fetch filtered data from the database
    const cars = await db.collection('inventory').find(query).toArray();

    if (!cars || cars.length === 0) {
      return NextResponse.json({ message: 'No cars found' }, { status: 404 });
    }

    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}
