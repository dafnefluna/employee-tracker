# Employee Tracker

## Description

The Employee Tracker is a Content Management System (CMS) that runs in our command-line interface. This CMS suitable for a business owner to manage their company's employee database, using Node.js, Inquirer, and PostgreSQL. With this application, users can manage the databases of their departments, the roles of their employees, and employees. Please visit this link for a brief demo of this application:
<https://drive.google.com/file/d/1zMN4tEO_hMXMkS_RAvBZ8gC00_p-Fcyu/view>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To properly install this application a user must have a PostgreSQL account and node.js installed. Using the npm library you can find the documentation to install inquirer, the pg.package. Ensure that inquirer, pg, and node are dev dependencies. Additionally, Please create an .env file that will inlude the following:
[DB_USER=postgres
DB_PASSWORD='insert your postgres password'
DB_NAME='insert your database name']

To set up the application for proper usage pleaes input the following commands into your terminal in this order:
-psql -U postgres;
-\i 'path to your schema.sql';
-\i 'path to your seeds.sql';
-\q 'to leave your postgres terminal'
-npm install
-npm i inquirer
-npm i pg
-npm i dotenv

For documentations and more information about these packages please visit the NPM library.

## Usage

To start the application please run your terminal at your root directory and type in npm start, or npm run build depending on your system. The application will populate different options in the command-line interface and you can use it until you chose to exit. To fully exit the application clear your terminal. To restart, rince and repeate.

## License

This project is licensed under the terms of the MIT. Visit  for more information

If the project license is listed as other or has no license, please email the developers for more information.

## Badges

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="254" height="20" role="img" aria-label="MIT: [https://opensource.org/licenses/MIT]"><title>MIT: [https://opensource.org/licenses/MIT]</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="254" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="31" height="20" fill="#555"/><rect x="31" width="223" height="20" fill="#4c1"/><rect width="254" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="165" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="210">MIT</text><text x="165" y="140" transform="scale(.1)" fill="#fff" textLength="210">MIT</text><text aria-hidden="true" x="1415" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="2130">[https://opensource.org/licenses/MIT]</text><text x="1415" y="140" transform="scale(.1)" fill="#fff" textLength="2130">[https://opensource.org/licenses/MIT]</text></g></svg>

## How to Contribute

As contributors and maintainers of this project, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities.

We are committed to making participation in this project a harassment-free experience for everyone, regardless of level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, or religion.

If you'd like to contribute further to the development of this project you can do so like this:
Please connect with Developr Dafne Luna

## Contact Us

For more information about our project please visit our Github Repo https://github.com/dafnefluna/employee-tracker. Check out our other projects by vising our github at dafnefluna or email us at dafne.faviola.luna@gmail.com
