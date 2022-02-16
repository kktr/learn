const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author'],
};

console.log(person.name);

let favoriteActivities: string[];

// favoriteActivities = 'sports';
// favoriteActivities = ['Spots', 1];

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

// person.role[1] = 10;
person.role[0] = 10;

person.role.push('11');

console.log('🚀 ~ person', person);

enum Role {
  ADMIN = 10,
  READ_ONLY,
  AUTHOR = 'Author',
}

const person2: {
  name: string;
  age: number;
  hobbies: string[];
  role: Role;
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
};

let favoriteActivities2: any;

favoriteActivities2 = 20;
favoriteActivities2 = 'world';
