const handleDownload = (post) => {
    if (post?.image) {
      const imageUrl = `http://localhost:5000/${post.image.replace(/\\/g, '/')}`;
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'image.jpg'; // You can set a custom name for the downloaded file
      link.target = '_blank'; // Open in a new tab or window
      link.click();
    } else {
      console.error('No image URL available for download.');
    }
  };


  
  export default handleDownload;
  