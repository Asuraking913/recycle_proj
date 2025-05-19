const uploader = (event, onImage, onImageData) => {

  // return
  const file = event.target.files[0]
  if (file && allowedExtensions(file.name)) {
      onImageData(file)
      const reader = new FileReader();
      reader.onloadend = async () => {
          onImage(t => reader.result)
      }

      const formData = new FormData()
      formData.append('estate', file)


      reader.readAsDataURL(file)
      event.target.value = ""

      return
  }
}

const allowedExtensions = (filename) => {
  const listExtensions = ['png', "jpeg", 'jpg']
  const newExt = filename.split(".").pop()
  return listExtensions.includes(newExt)
}

export default uploader