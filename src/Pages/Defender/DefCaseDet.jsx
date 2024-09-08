import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3'; // Import Web3
import { abi } from '../../abi'; // Adjust the path as needed
import styled from 'styled-components';
import { pinata } from '../../config'; // Import Pinata configuration

// Initialize Web3
const web3 = new Web3(window.ethereum); // Replace with your Ethereum node URL
const contractAddress = '0xc1B64F7343D87b0Ad439575F122fF57BF7a29f4d'; // Replace with your smart contract address
const contract = new web3.eth.Contract(abi, contractAddress);

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #ff0000;
`;

const CaseDetail = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #222;
  border: 1px solid #ff0000;
  border-radius: 8px;
`;

const Strong = styled.strong`
  display: block;
  margin-bottom: 5px;
  color: #ff0000;
`;

const ProofList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ProofItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #333;
  border: 1px solid #ff0000;
  border-radius: 5px;
`;

const Error = styled.div`
  color: #ff0000;
  text-align: center;
  font-size: 1.2rem;
`;

const DefCaseDet = () => {
  const { id } = useParams(); // Get case ID from URL
  const [caseDetails, setCaseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [signedUrls, setSignedUrls] = useState({});

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const caseData = await contract.methods.getCase(id).call();
        setCaseDetails(caseData);

        // Fetch signed URLs for FIR Document CID and proofs
        const urls = await Promise.all([
          getSignedUrl(caseData.firDocumentCID),
          ...caseData.proofs.map(proof => getSignedUrl(proof.cid))
        ]);

        setSignedUrls({
          firDocument: urls[0],
          proofs: urls.slice(1)
        });

      } catch (err) {
        setError('Error fetching case details');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const getSignedUrl = async (cid) => {
    try {
      const signedUrl = await pinata.gateways.createSignedURL({
        cid: cid,
        expires: 60 // URL expiration time in seconds
      });
      return signedUrl;
    } catch (err) {
      console.error('Error fetching signed URL:', err);
      return '';
    }
  };

  if (loading) return <Container>Loading...</Container>;

  if (error) return <Container><Error>{error}</Error></Container>;

  return (
    <Container>
      <Title>Case Details - {id}</Title>
      <CaseDetail>
        <Strong>Description:</Strong> {caseDetails.description || 'N/A'}
      </CaseDetail>
      <CaseDetail>
        <Strong>FIR Document:</Strong>
        {signedUrls.firDocument ? (
          <a href={signedUrls.firDocument} target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        ) : 'N/A'}
      </CaseDetail>
      <CaseDetail>
        <Strong>Proofs:</Strong>
        <ProofList>
          {caseDetails.proofs && caseDetails.proofs.map((proof, index) => (
            <ProofItem key={index}>
              <Strong>Name:</Strong> {proof.name || 'N/A'} - 
              <Strong>CID:</Strong> - 
              {signedUrls.proofs[index] ? (
                <a href={signedUrls.proofs[index]} target="_blank" rel="noopener noreferrer">
                  View Proof
                </a>
              ) : 'N/A'}
            </ProofItem>
          ))}
        </ProofList>
      </CaseDetail>
      <CaseDetail>
        <Strong>Status:</Strong> {caseDetails.status || 'N/A'}
      </CaseDetail>
      <CaseDetail>
        <Strong>Judgement:</Strong> {caseDetails.judgement || 'N/A'}
      </CaseDetail>
      <CaseDetail>
        <Strong>Hearing Count:</Strong> {caseDetails.hearingCount || 'N/A'}
      </CaseDetail>
    </Container>
  );
};

export default DefCaseDet;
