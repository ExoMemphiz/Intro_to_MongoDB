import mongo from 'mongodb';
const MongoClient = mongo.MongoClient;
// Connection url
const url = 'mongodb://46.101.166.144/local';
// Database Name
const dbName = 'local';

const collectionName = "twitter"; //"twitter"

let client: mongo.MongoClient;

export function connectClient() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (mongoError, mongoClient) => {
            if (mongoError) {
                reject(mongoError);
            } else {
                client = mongoClient;
                resolve();
            }
        });
    })
}

export function closeClient() {
    client.close();
}

export function distinctUsers(): Promise<any> {      //Array<string>
    return new Promise((resolve, reject) => {
        const collection = client.db(dbName).collection(collectionName);

        const options = {
            allowDiskUse: true
        }

        const pipeline = [
            {
                $group: {
                     _id: null,
                     distinctUsers: {
                          $addToSet: "$user"   
                     }   
                }   
           },
           {
                $project: {
                    userAmount: {
                        $size: "$distinctUsers"
                    }
                }   
           }
        ];

        const cursor = collection.aggregate(pipeline, options);
        cursor.toArray().then((data) => {
            resolve({distinctUsers: data[0].userAmount});
        }).catch((err) => {
            reject(err);
        });
    })
}

export function linksUsers(): Promise<any> {      //Array<string>
    return new Promise((resolve, reject) => {
        const collection = client.db(dbName).collection(collectionName);

        const options = {
            allowDiskUse: true
        }

        const pipeline = [
            {
                $match: {
                    text: /@\w+/
                }
            }, 
            {
                $group: {
                    _id: '$user', 
                    count: {
                        $sum: 1
                    }
                }
            }, 
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 10
            }
        ];

        const cursor = collection.aggregate(pipeline, options);
        cursor.toArray().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

export function mostMentionedUser(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const collection = client.db(dbName).collection(collectionName);

        const options = {
            allowDiskUse: true
        }

        const pipeline = [
            {
                $match: {
                    text: /@\w+/
                }
            },
            {
                $project: {
                    _id: "$user",
                	tweet: "$text"
                }
            }
        ];
        const cursor = collection.aggregate(pipeline, options);
        let mention = /@\w+/;
        let objectTree: any = {};
        let index = 1;
        console.log("Starting loop, it has around 720.000 indexes")
        while (await cursor.hasNext()) {
            if (index % 100000 === 0) {
                console.log(`Cursored through: ${index} objects`);
                //console.log(objectTree);
            } 
            let string = (await cursor.next()).tweet;
            while (string.match(mention)) {
                let match = string.match(mention);
                if (!objectTree[match[0]]) {
                    objectTree[match[0]] = 1;
                } else {
                    objectTree[match[0]]++;
                }
                string = string.replace(match[0], "");                
            }
            index++;
        }
        console.log(`Finally finished setting up object, now sorting...`);
        let array: Array<any> = [];
        Object.keys(objectTree).forEach((key) => {
            if (array.length < 5) {
                let obj: any = {};
                obj[key] = objectTree[key];
                array.push(obj);
                array.sort(sorter);
                //console.log(array);
            } else if (objectTree[key] > array[0][getFirstKey(array[0])]) {
                //Check if it's greater than the smallest number, if it is, replace the smallest.
                //Then swap one space at a time, until it's smaller or at end of object
                console.log(`Checking {${key}: ${objectTree[key]}}`);
                let obj: any = {};
                obj[key] = objectTree[key];
                array[0] = obj;
                let swaps = 0;
                for (let i = 1; i < array.length; i++) {
                    if (array[swaps][key] > array[i][getFirstKey(array[i])]) {
                        let temp = array[i];
                        array[i] = array[swaps];
                        array[swaps] = temp;
                        swaps++;
                    }
                }
            }
        })
        console.log(array);
        resolve(array);
    })
}

function getFirstKey(a: any) {
    let returningKey = "";
    Object.keys(a).forEach((key, index) => {
        returningKey = (index === 0 ? key : returningKey);
    });
    return returningKey;
}

function sorter(a: any, b: any): number {
    let aVal = a[getFirstKey(a)];
    let bVal = b[getFirstKey(b)];
    return aVal - bVal;
}

export function mostActiveUsers(): Promise<any> {      //Array<string>
    return new Promise((resolve, reject) => {
        const collection = client.db(dbName).collection(collectionName);

        const options = {
            allowDiskUse: true
        }

        const pipeline = [
            {
                $group: {
                    _id: '$user', 
                    count: {
                        $sum: 1
                    }
                }
            }, 
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 10
            }
        ];

        const cursor = collection.aggregate(pipeline, options);
        cursor.toArray().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

export function grumpyAndHappy(): Promise<any> {      //Array<string>
    return new Promise((resolve, reject) => {
        const collection = client.db(dbName).collection(collectionName);

        const options = {
            allowDiskUse: true
        }

        const pipeline0 = [
            {
                $match: {
                     polarity: 0
                }
            },
            {
                $group: {
                    _id: "$user",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    count: "$count",
                    polarity: {
                        $literal: "0"
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 5
            }
        ];
        const pipeline1 = [
            {
                $match: {
                     polarity: 4 
                }
            },
            {
                $group: {
                    _id: "$user",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    count: "$count",
                    polarity: {
                        $literal: "4"
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 5
            }
        ];

        Promise.all([
            collection.aggregate(pipeline0, options).toArray(),
            collection.aggregate(pipeline1, options).toArray()
        ]).then((array2d) => {
            let newArr: Array<any> = [];
            array2d.forEach((arr) => {
                arr.forEach((val) => {
                    newArr.push(val);
                })
            })
            resolve(newArr);
        });
    })
}
