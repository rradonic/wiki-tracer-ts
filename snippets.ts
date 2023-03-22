interface User {
  name: string;
  id: number;
}

class UserAccount {
  id: number;
  name: string;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

function test(): User {
  return new UserAccount("rst", 4);
}

let helloWorld = "Hello World";

type StringArray = Array<string>;
type ObjectWithNameArray = Array<{ name: string }>;

const sa: StringArray = ["wfp", "rst"];
const owna: ObjectWithNameArray = [{ name: "wfp" }];

const user: User = new UserAccount("wfp", 2);
