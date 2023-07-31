import express from 'express';
import util from 'util'
import mysql from 'mysql'
const app = express();

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'sql9.freemysqlhosting.net',
    user            : 'sql9636174',
    password        : 'VSppZH54iM',
    database        : 'sql9636174',
	waitForConnections: true,
	queueLimit: 0,
})

type FibonacciElement = {
	N:number,
	Value:number
}



const fibonacciSeries: number[] = [0, 1]


// Function to compute Fibonacci numbers using memoization
async function calculateFibonacci(n: number) {

	for(let i = 2 ; i < n; i ++){
		fibonacciSeries[i] = (fibonacciSeries[i - 1]! + fibonacciSeries[i -2]!);
	}

  

}

// Function to get the Fibonacci number from the database or compute it if not present
function getFibonacci(n: number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }
	 
	// get only required values from database
      connection.query(
        `SELECT Value from fibonacci where N <= ?`, [n],
        (queryError, results) => {
          connection.release();
			if(queryError){
				console.log(queryError)
			}
		
		// if the database has data add it to the array only if 2 or more rows, otherwise we fetch from local
		if (results.length > 2){
			results.forEach((result:FibonacciElement, i: number) => 
			{	
				fibonacciSeries[i] = result.Value
			})

		//database data could be unsorted
			fibonacciSeries.sort((a:number,b:number) => a-b)
		}

	
			
	// if there was data coming from the database, the new updation needs to take place only after the last index.
	const startValue:number = results.length > 0 ? results.length  : 0

            storeFibonacciInDB(n,  startValue)
              .then(() => resolve(fibonacciSeries))
              .catch((storeError) => reject(storeError));
          }
	        )        }
      );
    });
  }


// Function to store the Fibonacci numbers in the database 

const getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

// Function to store the Fibonacci numbers in the database
async function storeFibonacciInDB(n: number, startValue: number): Promise<void> {
	
 
  try {
    const connection = await getConnectionAsync();
    await connection.beginTransaction();
    
    calculateFibonacci(n); // Calculate the Fibonacci series again
   

    const valuesToInsert: [number, number][] = [];
    for (let i = startValue; i < n; i++) {
      valuesToInsert.push([i, fibonacciSeries[i]!]);
    }


    // ignore to avoid duplication
    if (valuesToInsert.length > 0) {
      await connection.query('INSERT IGNORE INTO fibonacci (N, Value) VALUES ?', [valuesToInsert]);
      console.log("Data updated in the Database");
    }

    await connection.commit();
    connection.release();
  } catch (error) {
    console.error('Error storing Fibonacci numbers:', error);
    throw error;
  }
}	
	

  

// API Endpoint to get Fibonacci number
app.get('/fibonacci', (req, res) => {
  const n = Number(req.query.value);

  getFibonacci(n)
    .then((result) => {
     
      res.send(result.slice(0,n));
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to Compute Fibonacci' });
    });
});


	app.listen(3000, () => {
		console.log("You are connected")
	})