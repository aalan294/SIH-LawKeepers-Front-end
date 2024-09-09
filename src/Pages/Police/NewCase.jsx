import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { pinata } from '../../config'; // Adjust the path as needed
import { abi } from '../../abi';
import styled from 'styled-components';
import api from '../../API/api';
import { useNavigate, Link } from 'react-router-dom';

// Contract ABI and Address
const contractAddress = '0xA4bd3b69114E22096CbF24D285Ae0c56e3025186'; // Replace with your actual contract address

// Styled Components
const NewCaseContainer = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
  background-color: #000;
  color: #fff;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff0000;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ff0000;
  border-radius: 4px;
  background-color: #222;
  color: #fff;

  &:focus {
    border-color: #ff0000;
    outline: none;
  }
`;

const FileInput = styled.input`
  padding: 5px;
  background-color: #222;
  color: #fff;
  border: 1px solid #ff0000;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: ${props => props.primary ? '#ff0000' : '#28a745'};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }
`;

const ConnectButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }
`;

const HamburgerMenu = styled.div`
  position: relative;
  top: 20px;
  left: 20px;
  cursor: pointer;
  font-size: 2rem;
  z-index: 1000;
  color: #fff;
`;

const NavDropdown = styled.div`
  position: absolute;
  top: 60px;
  left: 20px;
  background-color: #222;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-bottom: 1px solid #ff0000;

  &:hover {
    background-color: #333;
    color: #ff0000;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const NewCase = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    initialProofName: '',
    defenderName: '',
    defenderEmail: '',
    defenderPassword: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [initialProofFile, setInitialProofFile] = useState(null);
  const [fileCid, setFileCid] = useState('');
  const [initialProofCid, setInitialProofCid] = useState('');
  const [error, setError] = useState('');
  const [providerRequested, setProviderRequested] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingInitialProofFile, setUploadingInitialProofFile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const initWeb3 = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        if (!providerRequested) {
          setProviderRequested(true);
          try {
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(abi, contractAddress);

            setWeb3(web3);
            setContract(contract);
            setAccount(accounts[0]);
          } catch (error) {
            console.error('Error requesting accounts:', error);
            setError('Error connecting MetaMask');
          } finally {
            setProviderRequested(false);
          }
        }
      } else {
        alert('Please install MetaMask');
      }
    };

    initWeb3();
  }, [providerRequested]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInitialProofFileChange = (e) => {
    setInitialProofFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setUploadingFile(true);
    try {
      const upload = await pinata.upload.file(selectedFile);
      setFileCid(upload.cid);
      alert(`FIR Document uploaded successfully. CID: ${upload.cid}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading FIR document');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleInitialProofFileUpload = async () => {
    if (!initialProofFile) return;

    setUploadingInitialProofFile(true);
    try {
      const upload = await pinata.upload.file(initialProofFile);
      setInitialProofCid(upload.cid);
      alert(`Initial Proof Document uploaded successfully. CID: ${upload.cid}`);
    } catch (error) {
      console.error('Error uploading initial proof file:', error);
      setError('Error uploading initial proof document');
    } finally {
      setUploadingInitialProofFile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileCid || !initialProofCid) {
      setError('Both FIR and Initial Proof document uploads are required');
      return;
    }

    // Construct JSON data for the blockchain
    const caseData = {
      firDocumentCID: fileCid,
      description: formData.description,
      initialProofName: formData.initialProofName,
      initialProofCID: initialProofCid
    };

    try {
      // Call the smart contract method to create the case
      const response = await contract.methods.createCase(
        caseData.firDocumentCID,
        caseData.description,
        caseData.initialProofName,
        caseData.initialProofCID
      ).send({ from: account });

      // Get the case ID from the blockchain event
      const caseIdBigInt = response.events.CaseCreated.returnValues.caseId;

      // Convert caseId from BigInt to a number if needed
      const caseId = convertBigIntToNumber(caseIdBigInt);

      if (caseId === null) {
        throw new Error('Unable to convert caseId to a number');
      }

      // Send caseId and defender details to the backend to be stored in MongoDB
      const defenderData = {
        caseId,
        defenderName: formData.defenderName,
        defenderEmail: formData.defenderEmail,
        defenderPassword: formData.defenderEmail
      };

      await api.post('/police/new-case', defenderData);

      alert('Case created successfully and defender updated.');
      navigate('/police/dashboard');
      setFormData({
        description: '',
        initialProofName: '',
        defenderName: '',
        defenderEmail: '',
        defenderPassword: ''
      });
      setSelectedFile(null);
      setInitialProofFile(null);
      setFileCid('');
      setInitialProofCid('');
    } catch (err) {
      setError('Error creating case');
      console.error(err.message);
    }
  };

  // Helper function to convert BigInt to a number
  const convertBigIntToNumber = (bigIntValue) => {
    // Check if BigInt is a string with 'n' suffix
    if (typeof bigIntValue === 'string' && bigIntValue.endsWith('n')) {
      // Remove 'n' suffix and convert to number
      return parseInt(bigIntValue.slice(0, -1), 10);
    }

    // Handle cases where BigInt is already a number
    if (typeof bigIntValue === 'bigint') {
      return Number(bigIntValue);
    }

    // Handle unexpected format
    return null;
  };

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        setError('Error connecting wallet');
      }
    } else {
      alert('Web3 provider not detected');
    }
  };

  return (
    <NewCaseContainer>
      <HamburgerMenu onClick={handleMenuToggle}>☰</HamburgerMenu>
      <NavDropdown show={showMenu}>
        <NavLink to="/police/dashboard">Dashboard</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </NavDropdown>
      <ConnectButton onClick={connectWallet}>
        {account ? `Connected: ${account.substring(0, 6)}...${account.slice(-4)}` : 'Connect Web3 Wallet'}
      </ConnectButton>
      <Title>Create New Case</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <Input
          type="text"
          name="initialProofName"
          value={formData.initialProofName}
          onChange={handleChange}
          placeholder="Initial Proof Name"
        />
        <Input
          type="text"
          name="defenderName"
          value={formData.defenderName}
          onChange={handleChange}
          placeholder="Defender Name"
        />
        <Input
          type="email"
          name="defenderEmail"
          value={formData.defenderEmail}
          onChange={handleChange}
          placeholder="Defender Email"
        />
        <FileInput
          type="file"
          onChange={handleFileChange}
          placeholder="Upload FIR Document"
        />
        <Button type="button" onClick={handleFileUpload} disabled={uploadingFile}>
          {uploadingFile ? 'Uploading...' : 'Upload FIR Document'}
        </Button>
        <FileInput
          type="file"
          onChange={handleInitialProofFileChange}
          placeholder="Upload Initial Proof Document"
        />
        <Button type="button" onClick={handleInitialProofFileUpload} disabled={uploadingInitialProofFile}>
          {uploadingInitialProofFile ? 'Uploading...' : 'Upload Initial Proof Document'}
        </Button>
        <Button type="submit" primary>Create Case</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </NewCaseContainer>
  );
};

export default NewCase;
