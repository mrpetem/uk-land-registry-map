## Search UK Land Registry Property Sales (experimental)

This web application has been built to search and visualise property sales in England and Wales.

It uses [Next.js](https://nextjs.org/), [MongoDB](https://www.mongodb.com/) and publicly available [HM Land Registry data](https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads) licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

Map data provided by &copy; [OpenSteetMap contributors](https://www.openstreetmap.org/copyright)


### Other credits

- [OpenLayers v6.9.0](https://openlayers.org/)
- [Tailwind CSS v2.2.19](https://tailwindcss.com/)
- [How to Use OpenLayers Maps in React](https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744) by Matthew Brown


## Importing CSV Data

Bulk importing of csv data requires using mongoimport tool with the following command (depending on shape of data in csv file used):

```
// Requires following headertypes in first row of the csv file: id.string(),propertyClassification.string(),saleDate.date(2006-01-02),saleValue.int32(),lon.double(),lat.double(),postcode.string(),line1.string(),line2.string(),city.string(),county.string()
mongoimport --uri "mongodb+srv://USER:PASSWORD@cluster0.cxqgg.mongodb.net/DB_NAME?retryWrites=true&w=majority" --collection COLLECTION_NAME --type csv --file FILE_NAME --headerline --columnsHaveTypes

```


### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.



## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).



#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.



#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb&project-name=with-mongodb&repository-name=with-mongodb&env=MONGODB_URI,MONGODB_DB&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB)
