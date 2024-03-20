use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!("The value of the element at index {index} is: {element}");
}

// fn main() {
//     const KEY : u32 = 56;  // 56
//     // const KEY : u32 = 57; // here it will give error 
//     println!("{}",KEY);
// }

// fn main() {
//     let mut x = 1;
//     println!("x is {}", x);
//     {
//         let x = "hello";
//         // let x = 4;
//         // let x = x + 1;                // here x is 2 as summing 1 + 1 , we can access previous x value
//         println!("x is {}", x);      // here x is 4 as its a different scope
//     }
//     x = 2; // can redeclare x , like let x = 2; without using mut (mutable) keyword
//     println!("x is {}", x);
// }


// fn main() {
//     let mut x = 1;
//     println!("x is {}", x);
//     x = 2; // can redeclare x , like let x = 2; without using mut (mutable) keyword
//     println!("x is {}", x);
// }
