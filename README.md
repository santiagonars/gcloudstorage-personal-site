# Personal Website (With Hosting on Google Cloud)

### gcloudstorage-personal-site
-----
## Site
A static website I built from the ground up.

It was a great way to practice front-end technolgies such as HTML and CSS, as well as hosting a serverless static site in Google Cloud Platform. 

It works for mobile as well. To do this I added bootstrapped css (Version 4.5.2) and JS script elements.

## Hosting/Deployment
I deployed the website using the Cloud Storage hosting serverless solution offered by Google Cloud Platform (GCP).
This solution only allows host static sites using HMTL, CSS, and JS files.

### It is a simple hosting solution doing the following simplified steps after having a GCP account:
1) After buying a domain name, add the TXT Record to the domain registrar.
    - Google provides this TXT Record to validate that you are the owner of the site.
2) Create a storage bucket using the domain name the site and add the API web string (c.storage.googleapis.com) to the domain registrar as a CNAME record.
    - This bucket will have all files that the website will use.
    - I recommend setting the TTL for the domain as low (e.i. 1 min).
3) Using the Google Cloud SDK, from the local terminal use gsutils to push and update the website files (Only use HMTL, CSS, and JS files). 
    - In 'utils/using_gsutil.txt', see section USING GCLOUD STORAGE API AS CNAME for my personal examples the syntax I used to do this in UNIX (MAC).
    - Mainly just used the code under comment "#Migrate whole folder hierarchy / Update existing website".
4) Set the web enviroment variables to point to the main file (ex. index.html) and the error page (ex. 404.html).
    - Also in 'utils/using_gsutil.txt', see section USING GCLOUD STORAGE API AS CNAME.

## Technologies/Stacks:
- HTML
- CSS
- GCP (hosting)
