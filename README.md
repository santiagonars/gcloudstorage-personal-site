# Personal Portofilo Website (With Serverless hosting)

### gcloudstorage-portfolio
-----
## Site
A static website I built from the ground up.

It was a great way to practice front-end technolgies such as HTML and CSS, as well as hosting a serverless static site in Google Cloud Platform. 
It works for mobile as well. To do this I added bootstrapped css (Version 4.5.2) and JS script elements.

## Hosting
I hosted it serverless on Google Cloud Platform (GCP). It is using the Cloud Storage hosting feature.
This solution allows sites with HMTL, CSS, and JS files.

It is a simply hosting solution doing the following steps after have a GCP account:
1) Buy a domain name.
2) Add the TXT Record that Google providest to validate that you are the owner of the site.
3) Create a storage bucket using the domain name the site (www.domainname.com) and add the API web string (c.storage.googleapis.com) to the domain registrar as a CNAME record.
  - This bucket will have all files that the website will use.
  - I recommend setting the TTL for the domain as low (e.i. 1 min).
4) Using the Google Cloud SDK, from the local terminal use gsutils to push and update the website files. 
  - In 'utils/using_gsutil.txt', see section USING GCLOUD STORAGE API AS CNAME for my personal examples the syntax I used to do this in UNIX (MAC).
  - Mainly just used the code under comment "#Migrate whole folder hierarchy / Update existing website".
5) Set the web enviroment variables for the main site nad the error page.
  - Also in 'utils/using_gsutil.txt', see section USING GCLOUD STORAGE API AS CNAME.

### Technologies/Stacks:
- HTML
- CSS
- GCP (hosting)
