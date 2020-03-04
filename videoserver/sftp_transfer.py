import pysftp
import sys

def main():
    print("sftp transfer")

    try:
        # Defines the name of the file for download / upload
        # remote_file = sys.argv[1]
        filename = "testvideo.mp4"
        local_file = f"./{filename}"
        remote_path = f"/home/ubuntu/smart-helmet-integration/videoserver/files/{filename}"

        # srv = pysftp.Connection(host="your_FTP_server", username="your_username",
        # password="your_password")
        
        srv = pysftp.Connection(host="3.15.207.49", username="ubuntu", private_key="./aws_mag.pem")
        # Download the file from the remote server
        # srv.get(remote_file)

        # To upload the file, simple replace get with put. 
        srv.put(local_file, remotepath=remote_path)

        # Closes the connection
        srv.close()

        print("Done :)")
    except Exception as e:
        print(e)
    

if __name__ == "__main__":
    main()
