# ReconFace

Meet ReconFace, the innovative facial recognition system developed for our hackathon project to help law enforcement quickly identify suspects. With ReconFace, we're bringing simplicity to the process of criminal identification and making our communities safer, one face at a time.

ReconFace is a Facial Recognition system using Django and Django Rest Framework as backend

# Basic Working 

- Utilized the face recognition Python library to generate image encodings, stored in MongoDB for matching against
user uploads, also added the capability to add more images to the database
- Implemented a Django API using Django Rest Framework to handle image uploads, generate encodings, match
against stored images, return relevant matches to the frontend, and display the database on the frontend

# Working

Dashboard to upload images ,A simple image file can be uploaded using the upload box on the dash board and press submit
![image](https://user-images.githubusercontent.com/72181610/227723745-e0a9a5e5-0531-4a7e-bc4d-d790788d4fdc.png)

After uploading results of the highest matched individual are shown 
![image](https://user-images.githubusercontent.com/72181610/227723763-996083fa-328e-4dcd-97ea-2b5ab92eee56.png)

Dashboard to upload images to the database of known images
![image](https://user-images.githubusercontent.com/72181610/227723791-776754e0-00a7-4636-aeac-6cd4580caa43.png)

Image file is saved to the database along with the details of the person 
![image](https://user-images.githubusercontent.com/72181610/227723800-82f4e339-357a-4dde-8334-4c5867e0190c.png)

Tab to view all the images in the database with their corresponding information
![image](https://user-images.githubusercontent.com/72181610/227723839-b9f28f91-f772-4aa9-9995-b4b32c211d0d.png)

