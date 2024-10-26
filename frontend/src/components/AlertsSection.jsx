import React from 'react';
import './AlertsSection.css'; // Assuming you're adding custom styles here

const transactions = [
    { sender: "Alice", receiver: "Ivan", amount: 58.67, instrument: "PayPal", date: "2024-01-10" },
    { sender: "Charlie", receiver: "Grace", amount: 73.89, instrument: "Cryptocurrency", date: "2023-06-23" },
    { sender: "Dave", receiver: "Judy", amount: 52.77, instrument: "Bank Transfer", date: "2024-03-14" },
    { sender: "Bob", receiver: "Frank", amount: 34.56, instrument: "Credit Card", date: "2023-10-01" },
    { sender: "Eve", receiver: "Heidi", amount: 65.22, instrument: "Debit Card", date: "2023-08-18" },
    { sender: "Charlie", receiver: "Judy", amount: 27.99, instrument: "Bank Transfer", date: "2024-05-07" },
    { sender: "Alice", receiver: "Grace", amount: 89.45, instrument: "Cryptocurrency", date: "2023-12-15" },
    { sender: "Bob", receiver: "Ivan", amount: 92.01, instrument: "PayPal", date: "2024-02-28" },
    { sender: "Dave", receiver: "Frank", amount: 76.34, instrument: "Credit Card", date: "2023-11-22" },
    { sender: "Eve", receiver: "Heidi", amount: 55.78, instrument: "Debit Card", date: "2024-03-30" }
];

const AlertsSection = () => {
    return (
        <div className="alerts-section">
            <h2 className="title">Fraud Transaction Alerts</h2>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Amount ($)</th>
                        <th>Instrument</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.sender}</td>
                            <td>{transaction.receiver}</td>
                            <td>{transaction.amount.toFixed(2)}</td>
                            <td>{transaction.instrument}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlertsSection;
