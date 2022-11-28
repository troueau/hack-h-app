import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  container: {
    backgroundColor: "#FFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    textAlign: "center"
  },

  containerAbout: {
    flex: 2,
    backgroundColor: "#FFFF",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
  },

  titleAbout: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20
  },

  subTitleAbout: {
    textAlign: "center",
    fontSize: 15,
    padding: 10
  },

  textAbout: {
    textAlign: "center",
    fontSize: 15,
    padding: 5
  },

  specialTextAbout: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 15
  },

  bottomContainer: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    margin:8,
    padding:10,
    alignSelf: "center",
  },

  button: {
    marginTop: 15,
    padding: 5,
    borderWidth: 1.5,
    borderRadius: 10,
    alignSelf: "center"
  },

  appButtonText: {
    padding: 5,
    fontSize: 17,
    fontWeight: "bold",
  },

  textCarrousel: {
    fontSize: 11,
    left:10,
    bottom:1,
    padding:10,
    color: "white",
    fontWeight:"bold"
  },

  imageCarrousel: {
    width: "100%",
    height: "100%",
    borderRadius:10,
    overflow: 'hidden'
  },

  footerCarrousel: {
    width: "100%",
    height: "100%",
    marginTop: 105,
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },

  shapeCarrousel: {
    width: 130 * 2,
    height: 150,
    margin: 23,
    borderRadius:10
  },

  tabBarLabelStyle: {
     fontSize: 15,
    fontWeight: "bold",
    top: 10
  },

  scrollView: {
    marginHorizontal: 20,
  },

  viewImage: {
    flex:2,
    marginHorizontal:8,
    marginVertical:12,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  logoDetails: {
    position:"absolute",
    padding: 9
  },

  buttonDetails: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 180/2,
    flex:1
  },

  viewDetail: {
    flexDirection: "row",
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  
  imageAbout: {
    width: 250,
    height: 350,
    margin: 15,
    textAlign: "center",
    left: 46
  },

  titleDetails: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white',
    textAlign: "center"
  },

  infos: {
    fontWeight: "bold",
    padding: 10,
    marginBottom: 8,
  },

  heart: {
    width: 20,
    height: 20,
    margin: 15,
    tintColor: "#6e7f8d",
  },

  heartFilled: {
    tintColor: "#df245e",
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    width: "80%"
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },

  picture: {
    marginRight: 10,
    backgroundColor: "rgba(52, 52, 52, 0)",
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 180/2
  },

  primaryText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    marginBottom: 2,
  },

  secondaryText: {
      color: 'grey'
  },

  containerFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  outsideModalContent: {
      flexDirection: "column",
      flex:1,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "space-evenly",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 20,
  },

  radioButtonView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
  },

  titleRadioGroup: {
      fontSize: 20 ,
      fontWeight: "bold",
      alignSelf: "center"
  },
  searchbar: {
      flexGrow:4
  },

  searchInput: {
      color:"black"
  },

  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
  },

  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
  },
});
