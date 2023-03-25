import requests
import os
import faker
fake = faker.Faker(['en_IN'])

CWD_Path = os.getcwd()

with open('List of Actors.txt') as f:
    while True:
        os.chdir(CWD_Path)
        Name = f.readline()
        if not Name:
            break
        if len(Name) <= 1:
            continue
        else:
            path = os.path.join("./Bollywood_Actor_Images/",
                                Name.strip() + "/", "one.jpg")
            """ os.chdir(path)
            print(os.listdir())
            files = os.listdir()
            print(path) 

          
            for file in files:
                max_file = file """

            print(path)
            # os.chdir(CWD_Path)

            try:
                file = open(path, 'rb')
                x = requests.post(url="http://localhost:8000/api/train_image/media/", data={'name': Name.strip().replace(
                    "_", " "), 'address': fake.address(), 'description': fake.text(), }, files={'image_url': file})
                print(x.status_code)
            except:
                pass
