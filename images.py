import os

def rename_images(folder_path):
    counter = 1

    for filename in os.listdir(folder_path):
        if filename.endswith('.png'):  # Modify the file extension if necessary
            new_name = str(counter) + '.png'
            old_path = os.path.join(folder_path, filename)
            new_path = os.path.join(folder_path, new_name)
            os.rename(old_path, new_path)
            counter += 1

folder_path = 'C:/Users/ADMIN/Desktop/locationimage'  # Replace with the path to your folder
rename_images(folder_path)