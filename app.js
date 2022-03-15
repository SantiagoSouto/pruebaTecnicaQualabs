/**
 * 
 * Prueba técnica Qualabs - Santiago Souto
 * Se proveen archivos en formato JSON con usuarios y modulos a cargar.
 * Parte A: Que usuarios usan cual modulo?
 * Parte B: Conjunto mas pequeño de usuarios que entre todos utilicen todos los módulos
 * 
 */
const fs = require('fs');
const path = require('path');
 
const input = './input';
const outputA = './output/parteA.json';

/**
 * 
 * This function adds to a JSON Object the module as an attribute, if not added previously,
 * with a list of all the paths that uses that module.
 * 
 * @param {JSON Object} modules Storage of all the modules used at least once
 * @param {String} name Name of the module to be added (if its already added, it adds the user who used it)
 * @param {String} path Path of the JSON file that uses the module
 */
 function addModule(modules, name, path) {
    if (modules[name]) {                                        // if the module exists, then it has to add the file name to its list
        modules[name].push(path);
    } else {                                                    // if not, it creates a new list with the actual file name
        modules[name] = [path];
    }
}

/**
 * 
 * This function is used for seaching the minimum amount of users that can be found in all of the first array 
 * elements, and in all or almost all of the second array.
 * 
 * @param {Array} firstModule Array with the outer loop to search for the users that are in the inner array
 * @param {Array} secondModule Inner array that is evaluated depending on the outer values
 * @returns An array with the users from each of the outer modules, that is included once in each inner module (there can be some left out)
 */
function getUsersInEveryModule(firstModule, secondModule) {
    const usersInEveryModule = [];      // this is the variable to be returned
    const usedModules = [];             // auxiliary variable to make sure every module is searched

    // this search it has a BigO(n^3)
    firstModule.forEach(([firstKey, firstValue], firstIndex) => {                           // first loop for the outer array
        let index = firstIndex;                                                             // this will help us know which modules are for the second module in the aux var
        firstValue.forEach((firstUser, userIndex) => {                                      // second loop for each element of the outer array
            secondModule.forEach(([secondKey, secondValue]) => {                            // third loop for the inner array, to evalute each user of each element of the outer one with each element of the inner one
                let checkModules = (usedModules.length - index) === secondModule.length;    // boolean statement to know if every module of the inner array is included

                if (!usedModules.includes(firstKey) && !checkModules) {                             // if we used a user of the outer loop, we can move on
                    if ((!usedModules.includes(secondKey) && secondValue.includes(firstUser)) ||    // either the inner module is not included yet AND the outer user is in the inner element, 
                                    firstValue.length === (userIndex + 1)) {                        // or, it reached the final outer user so it has to be added 
                        
                                        usersInEveryModule.push(firstUser);                         // it pushes the outer user to the return value
                                        usedModules.push(firstKey);                                 // it adds the outer module so that is not repeated
                                        index = index + 1;

                                        if (secondValue.includes(firstUser)) {                      // only if the user was pushed because of the first condition
                                            usedModules.push(secondKey);                            // the inner module is included
                                        }
                                    }
                            } else if (usedModules.includes(firstKey) && checkModules) {            // if we just completed the inner array, we still need to add the user and outer module
                                usersInEveryModule.push(firstUser);
                                usedModules.push(firstKey);
                                index = index + 1;
                            }
                });
        });
    });

    return usersInEveryModule;                                                                      // returns the variable after all the loops
}

/**
 * 
 * Main function where both tasks are done.
 * We read all the JSON files, get each module and create an output with the users per module (task A).
 * Then, we use the information of the users per module to make a search of the minimum amount of users
 * that uses all the existing modules (task B).
 * 
 */
function startTask() {
    const authModules = {};       // where the auth modules will be stored, each one with a list of the files that uses them
    const contentModules = {};    // where the content modules will be stored, each one with a list of the files that uses them

    fs.readdirSync(input)                                                   // goes over the directory where the JSON files should be
        .filter(value => path.extname(value) === '.json')                   // just takes the files which extension is JSON
        .map(fileName => {                                                  // now lets map each file to work with it
            let fullPath = path.join(input, fileName).replace('\\', '/');   // formats the file path
            
            let user = JSON.parse(fs.readFileSync(fullPath));               // parse the file to JSON format to work with it

            let auth = user.provider.auth_module;                           // get the auth module of the user
            let content = user.provider.content_module;                     // get the content module of the user

            addModule(authModules, auth, fullPath);                         // adds the module, if its not already added, and pushes the file path to its list
            addModule(contentModules, content, fullPath);                   // same as above, with the content module
        }
    );

    const modules = {                                                       // creates the task A output as a JSON file
        'auth_module': authModules,
        'content_module': contentModules
    };

    fs.writeFileSync(outputA, JSON.stringify(modules, undefined, 4));       // creates an output file with a JSON formatted styling

    const newAuthModules = Object.entries(authModules);                     // takes the JSON object and parses it into a loopable object
    const newContentModules = Object.entries(contentModules);               // same as above

    const authUsersInModules = getUsersInEveryModule(newAuthModules, newContentModules);        // calls this function to make sure every auth module is included
    const contentUsersInModules = getUsersInEveryModule(newContentModules, newAuthModules);     // calls this function to make sure every content module is included

    let usersInEveryModule = authUsersInModules.concat(contentUsersInModules);                  // concatenates both arrays to get include every module
    usersInEveryModule = usersInEveryModule                                                     // filters the array to remove the duplicate users that may be
                            .filter((value, index) => {
                                return (usersInEveryModule.indexOf(value) == index)
                            });                            

    console.log(usersInEveryModule);                                                            // shows the output for task B
}


startTask();                // start of the app