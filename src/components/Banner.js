import React from 'react';
import { Pane, Heading, Text, Button } from 'evergreen-ui'; 
import videoSource from '../images/video-banner.mp4';
import { useNavigate } from 'react-router-dom'; 

export default function Banner() {
  const navigate = useNavigate(); 

  return (
    <Pane
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="95vh"
      marginBottom={8}
    >
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Tint */}
      <Pane
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.6)"
        zIndex={-1}
      ></Pane>

      {/* Content */}
      <Pane textAlign="center" zIndex={1} marginBottom={10}>
        <Heading size={900} color="white" fontWeight={700}>
          Brew Excellence at Home
        </Heading>
      </Pane>
      <Pane textAlign="center" marginBottom={24}>
        <Text color="white">
          Discover premium coffee beans and top-notch equipment to elevate your coffee experience. Dive into our curated collection today!
        </Text>
      </Pane>
      <Pane>
        <Button 
          appearance="primary"
          onClick={() => navigate('/product')} // Use navigate instead of window.location.href
          height={48}
          paddingX={32}
        >
          Explore Products
        </Button>
      </Pane>
    </Pane>
  );
}
