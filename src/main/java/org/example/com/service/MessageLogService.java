package org.example.com.service;

import org.example.com.domain.Attachment;
import org.example.com.domain.Employee;
import org.example.com.domain.MessageLog;
import org.example.com.dto.ChatMessage;
import org.example.com.excep.NoSuchDataException;
import org.example.com.repo.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageLogService {

    private final MessageLogRepository messageLogRepository;
    private final EmployeeRepository employeeRepository;
    private final ChatRoomRepository chatRoomRepository;
//    private final FindRoomRepository findRoomRepository;
    private final AttachmentRepository attachmentRepository;

    public MessageLogService(MessageLogRepository messageLogRepository, EmployeeRepository employeeRepository, ChatRoomRepository chatRoomRepository, AttachmentRepository attachmentRepository) {
        this.messageLogRepository = messageLogRepository;
        this.employeeRepository = employeeRepository;
        this.chatRoomRepository = chatRoomRepository;
//        this.findRoomRepository = findRoomRepository;
        this.attachmentRepository = attachmentRepository;
    }

    // 메시지 조회
    public List<MessageLog> getMessages(String code){
        return messageLogRepository.findMessageLogsByCodeOrderByRegdate(code)
                .orElseThrow(() -> new NoSuchDataException("데이터가 없습니다."));
    }

    public MessageLog saveMessage(ChatMessage chatMessage){
        Employee employee = employeeRepository.findEmployeeByUsername(chatMessage.getUsername());

        if(chatMessage.getFiles() == null){
            System.out.println("일반 메시지 저장");
            MessageLog messageLog = MessageLog.builder()
                    .sender(employee)
                    .code(chatMessage.getCode())
                    .content(chatMessage.getContent())
                    .regdate(chatMessage.getRegdate())
                    .build();

            return messageLogRepository.save(messageLog);
        }
        List<Attachment> list = (chatMessage.getFiles()).stream()
                .map((id) -> attachmentRepository.findById(id).orElse(null)).toList();

        MessageLog messageLog = MessageLog.builder()
                .sender(employee)
                .code(chatMessage.getCode())
                .content(chatMessage.getContent())
                .type("file")
                .files(list)
                .regdate(chatMessage.getRegdate())
                .build();

        return messageLogRepository.save(messageLog);
    }



}
