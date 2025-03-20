type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string;
};

type Mark = 1 | 2 | 3 | 4 | 5;

class School2 {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  private _areas: string[] = [];
  private _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): string[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: string): void {
    this._areas.push(area);
  }

  removeArea(area: string): void {
    this._areas = this._areas.filter(currentArea => currentArea !== area);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter(currentLecturer => currentLecturer !== lecturer);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  private _levels: string[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): string[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: string): void { 
    this._levels.push(level);
  }

  removeLevel(level: string): void {
    this._levels = this._levels.filter(currentLevel => currentLevel !== level);
  }
}

class Level2 {
  // implement getters for fields and 'add/remove group' methods

  private _groups: string[] = [];
  private _name:  string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get groups(): string[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addGroup(group: string): void {
    this._groups.push(group);
  }

  removeGroup(group: string): void {
    this._groups = this._groups.filter(currentGroup => currentGroup !== group);
  }
}

class Group2 {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  private _area: string;
  private _status:  string;
  private _students: Student2[] = []; // Modify the array so that it has a valid toSorted method*
  private _directionName: string;
  private _levelName: string;
  
  constructor(area: string, status: string, directionName: string, levelName: string) {
    this._area = area;
    this._status = status;
    this._directionName = directionName;
    this._levelName = levelName;
  }

  get area(): string {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  get students(): Student2[] {
    return this._students;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  addStudent(student: Student2): void {
    this._students.push(student);
  }

  removeStudent(student: Student2): void {
    this._students = this._students.filter(currentStudent => currentStudent !== student);
  }

  setStatus(status: string): void {
    this._status = status;
  }

  showPerformance(): Student2[] {
    const sortedStudents: Student2[] = this._students.toSorted((a: Student2, b: Student2) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}

class Student2 {
  // implement 'set grade' and 'set visit' methods
  
  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: {[workName: string]: Mark} = {}; // workName: mark // Objects with dynamic keys
  private _visits: {[lesson: string]: boolean} = {}; // lesson: present // Objects with dynamic keys

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

setGrade(workName: string, mark: Mark): void {
  this._grades[workName] = mark;
}

setVisit(lesson: string, present: boolean): void {
  this._visits[lesson] = present;
}

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number = gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number = (Object.values(this._visits).filter((present: boolean) => present).length / Object.values(this._visits).length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}