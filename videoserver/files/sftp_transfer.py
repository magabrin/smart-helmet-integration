import pysftp
import sys

def main():
    print("sftp transfer")

    # Defines the name of the file for download / upload
    # remote_file = sys.argv[1]
    remote_file = "testfile1.txt"

    srv = pysftp.Connection(host="your_FTP_server", username="your_username",
    password="your_password")

    # Download the file from the remote server
    srv.get(remote_file)

    # To upload the file, simple replace get with put. 
    srv.put(remote_file)

    # Closes the connection
    srv.close()

if __name__ == "__main__":
    main()